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
    const {animationState}=useAnimationSWR();
    const {setSelectMeshBox}=useCameraSWR()

    const meshRef=useRef<any>();

    useEffect(()=>{
        setStaticMeshList(meshRef)
    },[meshRef])

    useFrame(({clock})=>{
        if(meshState?.selectMesh.some((mesh)=>mesh===meshRef)){
            if(animationState?.onPostion){
                if(meshRef.current.position.x<animationState.position.x)
                    meshRef.current.position.x+=animationState.positionSpeed.x;
                if(meshRef.current.position.y<animationState.position.y)
                    meshRef.current.position.y+=animationState.positionSpeed.y;
                if(meshRef.current.position.y<animationState.position.z)
                    meshRef.current.position.z+=animationState.positionSpeed.z;
            }
            if(animationState?.onRotation){
                meshRef.current.eulerOrder='YXZ';
                meshRef.current.rotation.set(
                    meshRef.current.rotation.x+animationState.rotationSpeed.x,
                    meshRef.current.rotation.y+animationState.rotationSpeed.y,
                    meshRef.current.rotation.z+animationState.rotationSpeed.z);
            }
            if(animationState?.onScale){
                if(meshRef.current.scale.x<animationState.scale.x)
                    meshRef.current.scale.x+=animationState.scaleSpeed.x;
                if(meshRef.current.scale.y<animationState.scale.y)
                    meshRef.current.scale.y+=animationState.scaleSpeed.y;
                if(meshRef.current.scale.y<animationState.scale.z)
                    meshRef.current.scale.z+=animationState.scaleSpeed.z
            }
        }
    })

    const meshOnClick =async (e:any)=>{ 
        if(e.metaKey||e.ctrlKey){
            const index= meshState?.selectMesh?.findIndex((mesh)=>mesh.current.uuid===meshRef.current.uuid)!;
            if(index>=0){
                const meshList = [...meshState?.selectMesh!];
                meshList.splice(index,1)
                await setSelectMesh(meshList);
            }else{
                await setSelectMesh([...meshState?.selectMesh!,meshRef])
            }
        }else{
            console.log(meshRef.current);
            setSelectMesh([meshRef]);
        }
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
                setHoverMesh(meshRef);
            }}
            onPointerOver={(e)=>{ 
                setHoverMesh(meshRef);
            }}
            onPointerLeave={(e)=>{
                setHoverMesh(undefined)
            }}
            renderOrder={999}
            type={mesh.type}
            name={mesh.name}
            uuid={mesh.uuid}
            geometry={mesh.geometry}
            scale={mesh.scale}
            position={mesh.position}
            quaternion={mesh.quaternion}>
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