import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import THREE, { BoxGeometry, Mesh,Box3,Sphere, Group, Bone, EdgesGeometry, Matrix4 } from  "three";
import { memo, useEffect, useState } from "react";
import { MeshComponent } from "./mesh";
import {useRef} from 'react'
interface IMeshProps{
    meshGroup:Group,
}

export const MeshGroupComponent = ({meshGroup}:IMeshProps)=>{
    const group = useRef<any>();

    
    const MeshSwitch=()=>{
        return meshGroup.children.map((groupItem,index)=>{
            switch(groupItem.type){
                case 'Group':
                    return (<MeshGroupComponent key={index} meshGroup={groupItem as Group}/>)
                case 'Mesh':
                    return (<MeshComponent key={index} mesh={groupItem as Mesh}/>)
                case 'Bone':
                    // return (  <BoneComponent bone={groupItem as Bone}/>)
                    return (<MeshGroupComponent key={index} meshGroup={groupItem as Group}/>)
                case 'LineSegments':
                    return (<MeshComponent key={index} mesh={groupItem as Mesh}/>)
            }
        });
    }

    return(
       <group ref={group} position={meshGroup.position} scale={meshGroup.scale} 
       uuid={meshGroup.uuid}
        quaternion={meshGroup.quaternion}>
            {meshGroup?MeshSwitch():<></>}
        </group>
    )
}