import { useLoader } from "@react-three/fiber"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import THREE, { BoxGeometry, Mesh,Box3,Sphere, Group, Bone, EdgesGeometry, Matrix4, SkinnedMesh } from  "three";
import { memo, useEffect, useState } from "react";
import { MeshComponent } from "./mesh";
import {useRef} from 'react'
import { Object3D } from 'three';
import BoneComponent from "./bone";
import SwitchObject from "./switch-object";

interface IMeshProps{
    meshGroup:Object3D<THREE.Event>,
}

export const MeshGroupComponent = ({meshGroup}:IMeshProps)=>{

    return(
       <group 
       {...meshGroup as Group}
    //    position={meshGroup.position} 
    //    scale={meshGroup.scale} 
    //    uuid={meshGroup.uuid}
    //     quaternion={meshGroup.quaternion}
        
        >
            {meshGroup.children&&
            (
                <SwitchObject objectList={meshGroup.children}/>
            )}
        </group>
    )
}