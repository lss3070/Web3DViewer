import { Tree, Input } from "antd";

import { useEffect, useRef, useState,useCallback, SyntheticEvent, ReactChild, ReactNode } from "react";
import { Group } from "three"
import { Key } from "antd/lib/table/interface";
import { useCommonSWR } from "../swrs/common.swr";
import { useMeshSWR } from "../swrs/mesh.swr";
import { CustomDataNode } from "../interfaces/app.interface";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DataNode, EventDataNode } from "antd/lib/tree";
import { useMenuSWR } from '../swrs/menu.swr';
import ModalLayout from "./modal-layout";

interface IRightList{
    list:Group;
}

const TreeList=()=>{
    const {menuState}=useMenuSWR()
    const {Search}=Input;
    const { commonState }= useCommonSWR();
    const {meshState,setSelectMesh}= useMeshSWR()

    const [treeData,setTreeData]=useState<DataNode[]>();
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
        ,value:EventDataNode<any>)=>{
            const uuid = value.key as string;
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


    const loop =(data:CustomDataNode[]):DataNode[]=>{
            return data.map((item)=>{
                const index = item.title!.indexOf(searchValue)
                const beforeStr = item.title!.substr(0,index);
                const afterStr = item.title!.substr(index!+searchValue.length);

                const title= index!>-1?(
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
                        title:title,
                        key:item.key,
                        children:loop(item.children),
                    }
                }
                return {
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

        useEffect(()=>{
            const list = meshState?.selectMesh.map((mesh)=>mesh.current.uuid);
            setSelectList(list!);
        },[meshState?.selectMesh])
        useEffect(()=>{
            if(commonState?.groupList!==undefined){
                
                const list = loop(commonState?.groupList);
                console.log(list);
                setTreeData(list);
            }
        },[commonState,searchValue])

    useEffect(()=>{
        if(commonState?.groupList!==undefined){
            generateLoop(commonState.groupList);
        }
    },[commonState?.groupList]);


    const TitleComponent =({
        children,
        key,
        title
    }:any):ReactNode=>{
        return(
            <div
            // layout
            //  animate={{height:'auto'}}
            // transition={{
            //     height: {  stiffness: 100 },
            //     default: { duration: 0.5 },
            //   }}
            // exit={{height:0}}
            className=" font-medium overflow-hidden"
           
             key={key}>
                {title.props.children[2]}
            </div>
        )
    }

    return(

        <ModalLayout type="TreeList" 
        onModal={menuState?.treeList.on!}
        >
            <div className={`h-[400px] w-60 border rounded-md p-2 bg-[#64758b]
            `}>
            {(
                <div className="h-full w-full overflow-hidden bg-transparent">
                <div className="w-full flex justify-end">
                    <FontAwesomeIcon
                       icon={['fas','xmark']}
                       className="w-5 h-5 text-white"/>
                </div>
                <Search className="mb-2 bg-transparent" 
                placeholder="Search" 
                onChange={(e)=>{onChange(e)}}/>
                {/* <LayoutGroup> */}
                            <Tree
                            // titleRender={TitleComponent}
                            selectedKeys={selectList}
                            ref={treeRef}
                            multiple
                            treeData={treeData} 
                            onExpand={onExpand}
                            expandedKeys={expandedKeys!}
                            autoExpandParent={autoExpandParent}
                            height={commonState?.onMobile?200:undefined}
                            onClick={(e,value)=>{
                            
                            treeClickEvent(e,value)
                            }}
                            />
  
                {/* </LayoutGroup>     */}
                </div>
            )}
        </div>
        </ModalLayout>
    )
}

export default TreeList;