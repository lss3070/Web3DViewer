import { Html, PointMaterial, useBounds } from "@react-three/drei";
import { useEffect, useMemo, useState, useRef, memo } from 'react';
import { BackSide, Box3, Color, DoubleSide, FrontSide, Material, Matrix4, Mesh, PlaneGeometry, Vector3,EdgesGeometry, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshStandardMaterialParameters, MeshToonMaterial, Plane } from "three";

import { Outline } from '@react-three/postprocessing';
import { MeshStandardMaterialProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { useAnimationSWR } from "../swrs/animation.swr";
import { useMeshSWR } from "../swrs/mesh.swr";
import { useCommonSWR } from "../swrs/common.swr";
import { MeshHtmlComponent } from "./mesh-html";
import { MeshMode } from "../global/interfaces/swr.interface";
import { useCameraSWR } from '../swrs/camera.swr';
import { MaterialElements } from "../utils/materialElements";
import useIsMobile from '../hooks/useIsMobile';
import { useMeasureSWR } from '../swrs/measure.swr';
interface IMeshProps{
    mesh:THREE.Mesh
}

export const MeshComponent=({mesh}:IMeshProps)=>{
    
    const { meshState,setHoverMesh,setSelectMesh,setStaticMeshList }= useMeshSWR();
    const {measureState,setPoint}=useMeasureSWR()
    const isMobile = useIsMobile()

    const meshRef=useRef<any>();

    useEffect(()=>{
        setStaticMeshList(meshRef)
    },[meshRef])


    const meshOnClick =async (e: any)=>{ 
        if(!isMobile){
            measureState?.onMeasure?
            setPoint(e.point):
            setSelectMesh(meshRef);
            
            e.stopPropagation()
        }
    }

    const hoverEvent=(e: ThreeEvent<PointerEvent>)=>{
        if(!isMobile){

            !measureState?.onMeasure&&
            setHoverMesh(meshRef);

            e.stopPropagation();
        }
    }
    const onTouch=async(e:ThreeEvent<PointerEvent>)=>{
        if(isMobile){
            measureState?.onMeasure?
            setPoint(e.point):
            setSelectMesh(meshRef);
            
            e.stopPropagation()
        }
    }
    
        return(
            <>
            <mesh ref={meshRef} 
            onPointerUp={onTouch}
            onPointerOver={hoverEvent}

            onClick={meshOnClick}
            // onPointerDown={(e)=>{
            //     setSelectMesh([meshRef]);
            // }}
            
            onPointerMove={hoverEvent}
           
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
                    {/* <MeshHtmlComponent 
                    centerPosition={mesh.geometry.boundingSphere?.center!}
                    visible={meshState?.onText!}
                    name={mesh.name}
                    uuid={mesh.uuid} 
                    /> */}
           
            </>
            
        )
};

//https://yomotsu.github.io/camera-controls/examples/basic.html