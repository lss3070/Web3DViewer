import { Tree, Input } from "antd";

import React, { useEffect, useRef, useState,useCallback, SyntheticEvent, ReactChild, ReactNode, Children } from "react";
import { Box3, Group, Mesh } from "three"
import { Key } from "antd/lib/table/interface";
import { useCommonSWR } from "../swrs/common.swr";
import { useMeshSWR } from "../swrs/mesh.swr";
import { CustomDataNode } from "../interfaces/app.interface";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataNode, EventDataNode } from "antd/lib/tree";
import { useMenuSWR } from '../swrs/menu.swr';
import ModalLayout from "./modal-layout";
import _ from "lodash";
import { useCameraSWR } from '../swrs/camera.swr';


interface CustomNode extends DataNode {
    select:boolean;
    visible:boolean
}

const TreeList=()=>{
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
    const getParentKey = (key:string,tree:CustomDataNode[]):string => {
        let parentKey:string;
        for(let i=0;i<tree.length;i++){
            const node = tree[i];
            if(node.children){
                if(node.children.some(item=>item.key===key)){
                    parentKey = node.key as string;
                }else if(getParentKey(key,node.children)){
                    parentKey = getParentKey(key,node.children);
                }
            }
        }
        return parentKey!
    }

    const onChange= (e:React.ChangeEvent<HTMLInputElement>)=>{

        const {value} = e.target
        let list:(string)[]=[];
        
        generateList?.forEach((item)=>{
            if(item.title!.indexOf(value) >-1){
                list.push(getParentKey(item.key,commonState!.groupList!))
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

    const treeClickEvent=(e:React.MouseEvent<HTMLSpanElement, MouseEvent>
        ,key:string|number)=>{
            const uuid = key as string;
           
            console.log(meshState?.staticMeshList)
            // const keyIndex= meshState?.selectMesh?.findIndex((mesh)=>mesh.current.uuid===uuid)!;
            const mesh= meshState?.staticMeshList.find((mesh)=>mesh.current.uuid===uuid);

            if(mesh===undefined)return
            setSelectMesh(mesh)
            // if(e.ctrlKey||e.metaKey){
            //     if(keyIndex>=0){
            //         const meshList = [...meshState?.selectMesh!];
            //         meshList.splice(keyIndex,1);
            //         setSelectMesh([...meshList])
            //     }else{
            //         setSelectMesh([...meshState?.selectMesh!,mesh])
            //     }
            // }else{
            //     setSelectMesh([mesh])
            // }
    }


    const loop =(data:CustomDataNode[]):CustomNode[]=>{
            return data.map((item)=>{
                const index = item.title!.indexOf(searchValue)
                const beforeStr = item.title!.substr(0,index);
                const afterStr = item.title!.substr(index!+searchValue.length);

                const title= 
                index!>-1?
                (
                    <span>
                        {beforeStr}
                        <span className=" text-red-500">{searchValue}</span>
                        {afterStr}
                    </span>
                ):(
                    <span>{item.title}</span>
                );
                if(item.children){
                    return {
                        visible:item.visible,
                        title:title,
                        key:item.key,
                        children:loop(item.children),
                        select:item.select,
                    }
                }
                return {
                    select:item.select,
                    visible:item.visible,
                    title:title, 
                    key:item.key,
                }
            })
        }
        // const treeData = useMemo(()=>{
        //     if(commonState?.groupList!==undefined){
        //         const list = loop(commonState?.groupList);
        //         return list;
        //     }
        //     return undefined;
        // },[commonState,searchValue])


        // let selectList = useMemo(()=>meshState?.selectMesh!.map((mesh)=>mesh.current.uuid)
        // ,[meshState?.selectMesh])
        const SelectListChange=(listdata:string[],tree:CustomDataNode,)=>{
            if(listdata.length===0) return tree;
            
            const index = listdata.indexOf(tree.key);

            if(index>=0){  
                let curlist = listdata.splice(index,1);
                tree.select=true;
                for(let i=0;i<tree.children?.length!;i++){
                    tree.children![i] = SelectListChange(curlist,tree.children![i]) as CustomDataNode
                }
            }else{
                tree.select=false;
                for(let i=0;i<tree.children?.length!;i++){
                    tree.children![i] = SelectListChange(listdata,tree.children![i]) as CustomDataNode
                }
            }
            return tree;
        }


        useEffect(()=>{
            // const list = meshState?.selectMesh.map((mesh)=>mesh.current.uuid);

            setSelectList([meshState?.selectMesh?.current.uuid!]);
        },[meshState?.selectMesh])
        //검색시 변경
        useEffect(()=>{
            if(commonState?.groupList!==undefined){
                const list = loop(commonState?.groupList);
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
        //visible 재귀함수
        const visibleChangeLoop=(key:string|number,
            tree:CustomDataNode,
            value?:boolean)=>{
                    if(tree.key===key){
                        tree.visible=value?value:!tree.visible;
                        if(tree.children){
                            for(let i=0;i<tree.children.length;i++){
                                tree.children[i]= visibleChangeLoop(tree.children[i].key,
                                    tree.children[i],tree.visible) as CustomDataNode
                            }
                        }
                    }else{
                        if(tree.children){
                            for(let i=0;i<tree.children.length;i++){
                                tree.children[i]= visibleChangeLoop(key,
                                    tree.children[i],value) as CustomDataNode
                            }
                        }
                    }
                    return tree;
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
            //    const result= meshState?.selectMesh.filter((item)=>item.current.uuid!==info.node.key);
            //    setSelectMesh(result!);
            }
          
        })

interface TitleProps{
    node:CustomNode;
    visibleChange:Function;
}

    const TitleComponent =({node,visibleChange}:TitleProps):ReactNode=>{   
     
        const onIconClick=(e:React.MouseEvent<SVGSVGElement, MouseEvent>)=>{    
            const object = commonState?.scene?.current?.getObjectByProperty('uuid',node.key+'') as Mesh|Group
            if(object){
                object.visible=!node.visible;
                visibleChange(node.key);
            }
            e.stopPropagation();
        }
        const onDoubleClick=()=>{
            const mesh= commonState?.scene?.current?.getObjectByProperty('uuid',node.key+'') as Mesh;

            setSelectMeshBox(new Box3().setFromObject(mesh))
        }
  

        return(
            <div
            className=" font-medium overflow-hidden w-full flex items-center"
             key={node.key}>
                 <FontAwesomeIcon
                      icon={['fas','eye']}
                      onClick={onIconClick}
                      className={`w-5 h-5
                      ${node.visible?`text-black`:`text-gray-300`}
                      `}/>
                 <div className={`
                  ${node.select?`bg-slate-500`:`bg-none`}
                 `}
                 onClick={(e)=>treeClickEvent(e,node.key)}
                 onDoubleClick={onDoubleClick}
                 >
                    {node.title as React.ReactNode}
                 </div>
            </div>
        )
    }

    const {onTreeList}=useMenuSWR()
    const closeTreeList=()=>{
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
                    <div className='w-full flex items-center justify-center h-12'>
                        <div className='w-full text-base font-semibold'>
                            <FontAwesomeIcon
                                    icon={['fas','folder-tree']}
                                    className="w-8 h-8 cursor-pointer"/>
                            <span>
                                TreeList
                            </span>
                        </div>
                        <div className='w-full flex justify-end'>
                            <FontAwesomeIcon
                                onClick={closeTreeList}
                                icon={['fas','xmark']}
                                size="lg"
                                className="cursor-pointer"/>
                        </div>
                    </div>
                    <div
                    onMouseDown={(e)=>setDrag(false)}
                    onMouseLeave={(e)=>setDrag(true)}
                    >
                        {/* search box */}
                        <div className="w-full relative mb-2">
                            <input className="w-full h-8 p-2 
                             select-none
                            bg-[#f7fafb]
                            dark:bg-gray-400 rounded-xl
                            placeholder:text-gray-600 
                             dark:placeholder:text-white
                            outline-none shadow-lg border border-gray-100 dark:border-transparent"
                            placeholder="Search"
                            onChange={(e)=>onChange(e)}
                            />
                            <FontAwesomeIcon
                                icon={['fas','magnifying-glass']}
                                className="w-5 h-5 absolute top-2 right-1 "/>
                        </div>
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
                                titleRender={(node)=>TitleComponent({
                                    node:node,
                                    visibleChange:visibleChange
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
                                // onClick={(e,value)=>{
                                // treeClickEvent(e,value)
                                // }}
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