import { Tree } from "antd";

import React, { useEffect, useRef, useState, ReactChild, ReactNode, Children } from "react";
import { Box3, Group, Mesh } from "three"
import { Key } from "antd/lib/table/interface";
import { useCommonSWR } from "../../swrs/common.swr";
import { useMeshSWR } from "../../swrs/mesh.swr";
import { CustomDataNode } from "../../global/interfaces/app.interface";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  EventDataNode } from "antd/lib/tree";
import { useMenuSWR } from '../../swrs/menu.swr';
import ModalLayout from "../modal/in-canvas-modal-layout";
import _ from "lodash";
import { useCameraSWR } from '../../swrs/camera.swr';
import { CustomNode } from "../../global/interfaces/tree.interface";
import TreeTitle from "./tree-title";
import GetParentKey from "../../utils/tree/getParentKey";
import RenderLoop from "./renderLoop";
import visibleChangeLoop from "../../utils/tree/visibleChangeLoop";
import TreeSearchBox from "./inputBox";
import ModalHeader from '../common/modal-header';

const TreeList=()=>{
    const {onTreeList}=useMenuSWR()
    const {menuState}=useMenuSWR()
    const { commonState,setGroupList }= useCommonSWR();
    const {meshState,setSelectMesh}= useMeshSWR();
    const {setSelectMeshBox}=useCameraSWR()

    const [treeData,setTreeData]=useState<CustomNode[]>();
    const [expandedKeys,setExpandedKeys]=useState<(string)[]>();
    const [autoExpandParent,setAutoExpandParent]=useState<boolean>(true);
    const [searchValue,setSearchValue]=useState<string>('');
    const [generateList,setGenerateList]=useState<CustomDataNode[]>([]);

    const [selectList,setSelectList]= useState<string[]>([])
    const treeRef=useRef<any>(null)

    const [drag,setDrag]=useState<boolean>(true);


    const generateLoop = (data:CustomDataNode[])=>{
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const value:CustomDataNode={
                visible:node.visible,
                select:node.select,
                key:node.key,
                title:node.title!
            }
            setGenerateList((cur)=>[...cur!,value])
            if (node.children) {
                generateLoop(node.children)
            }
        }
    }


    const onChange= (e:React.ChangeEvent<HTMLInputElement>)=>{

        const {value} = e.target
        let list:(string)[]=[];
        
        generateList?.forEach((item)=>{
            if(item.title!.indexOf(value) >-1){
                list.push(GetParentKey(item.key,commonState!.groupList!))
            }
        });

        list.filter((item,i,self)=>item&&self.indexOf(item)===i);
        setExpandedKeys(list);
        setAutoExpandParent(true)
        setSearchValue(value);
    }

    const onExpand = (expanedKeys:Key[])=>{
            setExpandedKeys(expanedKeys as string[]);
            setAutoExpandParent(false);
    }

    const onTitleClickEvent=(e:React.MouseEvent<HTMLSpanElement, MouseEvent>
        ,key:string|number)=>{
            const uuid = key as string;
           
            const mesh= meshState?.staticMeshList.find((mesh)=>mesh.current.uuid===uuid);

            if(mesh===undefined)return
            setSelectMesh(mesh)
    }


    // const SelectListChange=(listdata:string[],tree:CustomDataNode,)=>{
    //     if(listdata.length===0) return tree;
        
    //     const index = listdata.indexOf(tree.key);

    //     if(index>=0){  
    //         let curlist = listdata.splice(index,1);
    //         tree.select=true;
    //         for(let i=0;i<tree.children?.length!;i++){
    //             tree.children![i] = SelectListChange(curlist,tree.children![i]) as CustomDataNode
    //         }
    //     }else{
    //         tree.select=false;
    //         for(let i=0;i<tree.children?.length!;i++){
    //             tree.children![i] = SelectListChange(listdata,tree.children![i]) as CustomDataNode
    //         }
    //     }
    //     return tree;
    // }


    useEffect(()=>{
        setSelectList([meshState?.selectMesh?.current.uuid!]);
    },[meshState?.selectMesh])

    //검색시 변경
    useEffect(()=>{
        if(commonState?.groupList!==undefined){
            const list = RenderLoop(commonState?.groupList,searchValue);
            setTreeData(list);
        }
    },[commonState,searchValue])

    //groupList가져올때 tree에 그려질 데이터 리 렌더링
    useEffect(()=>{
        if(commonState?.groupList!==undefined){
            generateLoop(commonState.groupList);
        }
    },[commonState?.groupList]);

    //visible 버튼 클릭시 이벤트
    const visibleChange=(uuid:string)=>{
        let copy = _.cloneDeep(commonState?.groupList);
        const result= copy?.map((item)=>{
            return visibleChangeLoop(uuid,item);
        })
        setGroupList(result!)
    }


    const onSelect=((selectedKeys: Key[], info: {
        event: "select";
        selected: boolean;
        node: EventDataNode<CustomNode>;
        selectedNodes: CustomNode[];
        nativeEvent: MouseEvent;
    })=>{
        if(!info.selected){
            meshState?.selectMesh?.current.uuid!==info.node.key&&setSelectMesh(meshState?.selectMesh!)
        }
        
    })

    const onTitleIconClick=(e:React.MouseEvent<SVGSVGElement, MouseEvent>
        ,key:string,visible:boolean
        )=>{    
        const object = commonState?.scene?.current?.getObjectByProperty('uuid',key+'') as Mesh|Group
        if(object){
            object.visible=!visible;
            visibleChange(key);
        }
        e.stopPropagation();
    }

    const onTitleDoubleClick=(key:string)=>{
        const mesh= commonState?.scene?.current?.getObjectByProperty('uuid',key+'') as Mesh;

        setSelectMeshBox(new Box3().setFromObject(mesh))
    }

    const onCloseTreeList=()=>{
        onTreeList(false);
    }

    return(
        <ModalLayout type="TreeList" 
        onModal={menuState?.treeList.on!}
        drag={drag}
        >
            <div className={`h-auto w-72 rounded-md px-4 pb-4`}>
            {(
                /* </LayoutGroup>     */
                <div className="h-auto w-full ">
                    {/* title */}
                    <ModalHeader onClose={onCloseTreeList}>
                        <div className='w-full text-base font-semibold'>
                        <FontAwesomeIcon
                                icon={['fas','folder-tree']}
                                className="w-8 h-8 cursor-pointer"/>
                        <span>
                            TreeList
                        </span>
                    </div>
                    </ModalHeader>
                    <div
                    onMouseDown={(e)=>setDrag(false)}
                    onMouseLeave={(e)=>setDrag(true)}
                    >
                        {/* search box */}
                        <TreeSearchBox onChange={onChange}/>
                        {/* <LayoutGroup> */}
                        <div className="rounded-xl 
                        shadow-lg
                        border
                        border-gray-100
                        dark:border-transparent
                        bg-[#f7fafb] 
                        dark:bg-[#9ca3af]
                        text-white h-[330px] p-1">
                            <Tree
                                style={{backgroundColor:
                                    commonState?.darkMode?'#9ca3af':'#f7fafb',
                                color:commonState?.darkMode?'white':'#4b5663',
                                border:'none'
                                }}
                                className=" overflow-scroll h-full"
                                titleRender={(node)=>TreeTitle({
                                    node:node,
                                    iconClickEvent:onTitleIconClick,
                                    clickEvent:onTitleClickEvent,
                                    doubleClickEvent:onTitleDoubleClick,
                                    
                                })}
                                selectedKeys={selectList}
                                selectable={true}
                                onSelect={onSelect}
                                icon
                                ref={treeRef}
                                multiple
                                treeData={treeData} 
                                onExpand={onExpand}
                                expandedKeys={expandedKeys!}
                                autoExpandParent={autoExpandParent}
                                height={commonState?.onMobile?200:undefined}
                            >
                            </Tree>
                        </div>
                    </div>   
                </div>
            )}
        </div>
        </ModalLayout>
    )
}

export default TreeList;