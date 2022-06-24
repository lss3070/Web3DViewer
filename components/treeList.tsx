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
            const keyIndex= meshState?.selectMesh?.findIndex((mesh)=>mesh.current.uuid===uuid)!;
            const mesh= meshState?.staticMeshList.filter((mesh)=>mesh.current.uuid===uuid)![0]!;
            
            if(mesh===undefined)return
            if(e.ctrlKey||e.metaKey){
                if(keyIndex>=0){
                    const meshList = [...meshState?.selectMesh!];
                    meshList.splice(keyIndex,1);
                    setSelectMesh([...meshList])
                }else{
                    setSelectMesh([...meshState?.selectMesh!,mesh])
                }
            }else{
                setSelectMesh([mesh])
            }
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
            const list = meshState?.selectMesh.map((mesh)=>mesh.current.uuid);
            setSelectList(list!);
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
               const result= meshState?.selectMesh.filter((item)=>item.current.uuid!==info.node.key);
               setSelectMesh(result!);
            }
            console.log(meshState?.selectMesh);
            console.log(info);
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
                 onClick={onIconClick}
                      icon={['fas','eye']}
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

    return(
        <ModalLayout type="TreeList" 
        onModal={menuState?.treeList.on!}
        >
            <div className={`h-[400px] w-60 rounded-md p-2 
                   bg-gray-200
                   dark:bg-slate-600
            `}>
            {(
                <div className="h-auto w-full bg-slate-600 ">
                    <div className="w-full flex justify-end">
                        <FontAwesomeIcon
                        icon={['fas','xmark']}
                        className="w-5 h-5 text-white"/>
                    </div>
                    <div className="w-full relative mb-2">
                        <input className="w-full h-8 p-2 bg-gray-400 rounded-xl
                        placeholder:text-white outline-none"
                        placeholder="Search"
                        onChange={(e)=>onChange(e)}
                        />
                        <FontAwesomeIcon
                            icon={['fas','magnifying-glass']}
                            className="w-5 h-5 absolute top-2 right-1 
                            text-white"/>
                    </div>

                {/* <LayoutGroup> */}
                <div className="rounded-xl bg-[#9ca3af] text-white p-1 h-[330px]">
                    <Tree
                        style={{backgroundColor:'#9ca3af',color:'white',
                        borderRadius:'10px'
                        }}
                        className="text-white  overflow-scroll h-full"
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
              
                {/* </LayoutGroup>     */}
                </div>
            )}
        </div>
        </ModalLayout>
    )
}

export default TreeList;