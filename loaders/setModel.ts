import { useState } from "react";
import { Bone, Box3, BufferGeometry, Group, Mesh, MeshPhysicalMaterial, Object3D } from "three"
import { CustomDataNode } from "../interfaces/app.interface";
import { useCameraSWR } from "../swrs/camera.swr";
import { useCommonSWR } from "../swrs/common.swr";
import { useMeshSWR } from '../swrs/mesh.swr';


const SettingModel =(data:Group|Object3D<Event>|BufferGeometry)=>{

    const {commonState,setGroupList,setFileLoad,setFileUuid}=useCommonSWR();
    const {setMeshBox}=useCameraSWR();
    const {setMeshGroup}=useMeshSWR()
    
    switch(data.type){
        case 'Group':
            console.log('!!')
            const object =data as Group;
            new Box3().setFromObject(object).getCenter(object.position).multiplyScalar(-1);

            const group = groupLoop(object);
    
            setGroupList(group);
            setMeshGroup(object);
    
            const box = new Box3().setFromObject(object);
                  
            setFileLoad(true);
            setMeshBox(box);
            // setLoadingComplete(true);
            setFileUuid(object.uuid);
            break;
        case 'BufferGeometry':
            break;
    }
}
export default SettingModel;

const groupLoop=(item:Mesh|Group|Bone):CustomDataNode[]=>{
    let temp:CustomDataNode[]
    temp=item.children.map((groupItem):CustomDataNode=>{
        switch(groupItem.type){//groupItem.constructor.name
           
            case'Mesh':
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name,
                children:groupLoop(groupItem as Mesh)
            }
            case'Group':
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name,
                children:groupLoop(groupItem as Group)
            }
            case 'Bone':
                return{
                    visible:true,
                    select:false,
                    key:groupItem.uuid,
                    type:groupItem.type,
                    title:groupItem.name,
                    children:groupLoop(groupItem as Bone)
                }
            default:
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name
            };
        }
    })
    return temp;
}