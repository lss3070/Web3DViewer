import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import THREE, { BoxGeometry, Mesh,Box3,Sphere, Group, Bone, EdgesGeometry, Matrix4 } from  "three";
import { memo, useEffect, useState } from "react";
import { MeshComponent } from "./mesh";
import {useRef} from 'react'
import { Object3D } from 'three';
import BoneComponent from "./bone";

interface IMeshProps{
    meshGroup:Object3D<THREE.Event>,
}

export const MeshGroupComponent = ({meshGroup}:IMeshProps)=>{

    
    const MeshSwitch=()=>{
        return meshGroup.children.map((groupItem,index)=>{
            switch(groupItem.type){
                case 'Group':
                    return (<MeshGroupComponent key={index} 
                        meshGroup={groupItem}/>)
                case 'Mesh':
                    return (<MeshComponent key={index} mesh={groupItem as Mesh}/>)
                case 'SkinnedMesh':
                    return (<MeshComponent key={index} mesh={groupItem as Mesh}/>)
                case 'Bone':
                    return (<BoneComponent key={index} 
                        boneItems={groupItem as Group}/>)
                case 'LineSegments':
                    return (<MeshComponent key={index} 
                        mesh={groupItem as Mesh}/>)
            }
        });
    }

    return(
       <group
       position={meshGroup.position} 
       scale={meshGroup.scale} 
       uuid={meshGroup.uuid}
        quaternion={meshGroup.quaternion}>
            {meshGroup?MeshSwitch():<></>}
        </group>
    )
}