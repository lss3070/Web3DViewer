import { Html, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useState, useRef, memo } from 'react';
import { BackSide, Box3, Color, DoubleSide, FrontSide, Material, Matrix4, Mesh, PlaneGeometry, Vector3,EdgesGeometry, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshStandardMaterialParameters, MeshToonMaterial, Plane } from "three";

import { Outline } from '@react-three/postprocessing';
import { MeshStandardMaterialProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { useAnimationSWR } from "../swrs/animation.swr";
import { useMeshSWR } from "../swrs/mesh.swr";
import { useCommonSWR } from "../swrs/common.swr";
import { MeshHtmlComponent } from "./mesh-html";
import { MeshMode } from "../interfaces/swr.interface";
import { useCameraSWR } from '../swrs/camera.swr';
import { MaterialElements } from "../utils/materialElements";
interface IMeshProps{
    mesh:THREE.Mesh
}

export const MeshComponent=({mesh}:IMeshProps)=>{
    
    const { meshState,setHoverMesh,setSelectMesh,setStaticMeshList }= useMeshSWR();
    const {setSelectMeshBox}=useCameraSWR()

    const meshRef=useRef<any>();

    useEffect(()=>{
        setStaticMeshList(meshRef)
    },[meshRef])


    const meshOnClick =async (e: any)=>{ 

        setSelectMesh(meshRef);
        e.stopPropagation()
    }
    const meshDoubleClick=()=>{
        setSelectMeshBox(new Box3().setFromObject(meshRef.current))
    }

        return(
            <>
            <mesh ref={meshRef} 
            onClick={meshOnClick}
            // onPointerDown={(e)=>{
            //     setSelectMesh([meshRef]);
            // }}
            onDoubleClick={meshDoubleClick}
            onPointerMove={(e)=>{
                console.log('pointermove');
                setHoverMesh(meshRef);
            }}
            onPointerOver={(e)=>{ 
                console.log('pointover');
                setHoverMesh(meshRef);
            }}
            onPointerLeave={(e)=>{
                console.log('pointerleave');
                setHoverMesh(undefined)
            }}
            {...mesh}
            
            // type={mesh.type}
            // name={mesh.name}
            // uuid={mesh.uuid}
            // geometry={mesh.geometry}
            // scale={mesh.scale}
            // position={mesh.position}
            // quaternion={mesh.quaternion}
            >
                {MaterialElements(mesh.material,meshState?.onWire!)}
            </mesh>
                    <MeshHtmlComponent 
                    centerPosition={mesh.geometry.boundingSphere?.center!}
                    visible={meshState?.onText!}
                    name={mesh.name}
                    uuid={mesh.uuid} 
                    />
           
            </>
            
        )
};

//https://yomotsu.github.io/camera-controls/examples/basic.html