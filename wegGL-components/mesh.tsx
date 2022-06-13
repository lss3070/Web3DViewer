import { Html, PointMaterial } from "@react-three/drei";
import { useEffect, useMemo, useState, useRef, memo } from 'react';
import { BackSide, Box3, Color, DoubleSide, FrontSide, Material, Matrix4, Mesh, PlaneGeometry, Vector3,EdgesGeometry, MeshBasicMaterial, MeshPhongMaterial, MeshStandardMaterial, MeshStandardMaterialParameters, MeshToonMaterial } from "three";

import { Outline } from '@react-three/postprocessing';
import { MeshStandardMaterialProps, ThreeEvent, useFrame } from "@react-three/fiber";
import { useAnimationSWR } from "../swrs/animation.swr";
import { useMeshSWR } from "../swrs/mesh.swr";
import { useCommonSWR } from "../swrs/common.swr";
import { MeshHtmlComponent } from "./mesh-html";
import { MeshMode } from "../interfaces/swr.interface";
interface IMeshProps{
    mesh:THREE.Mesh
}

export const MeshComponent=({mesh}:IMeshProps)=>{
    
    const { meshState,setHoverMesh,setSelectMesh,setStaticMeshList }= useMeshSWR();
    const {animationState}=useAnimationSWR();
    const {commonState}=useCommonSWR();

    const [wire,setWire]=useState<boolean>(false);
    const [point,setPoint]=useState<boolean>(false);

    useEffect(()=>{
        switch(meshState?.meshMode){
            case MeshMode.Default:
                setWire(false)
                break;
            case MeshMode.Point:
                setPoint(true);
                break;
            case MeshMode.Wire:
                setWire(true)
                break;
        }
    },[meshState?.meshMode])

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

    const switchMaterial=(material:Material,index?:number)=>{
        
        switch(material.type){
            case 'MeshPhysicalMaterial':
                return <meshPhysicalMaterial {...material} wireframe={wire}  key={index?index:0}/>;
            case 'MeshStandardMaterial':
                return <meshStandardMaterial {...material} wireframe={wire}  key={index?index:0}/>;
            case 'MeshToonMaterial':
                return <meshToonMaterial {...material} key={index?index:0}/>;
            case 'MeshNormalMaterial':
                return <meshNormalMaterial {...material} wireframe={wire} key={index?index:0}/>;
            case 'MeshDepthMaterial':
                return <meshDepthMaterial {...material} wireframe={wire}  key={index?index:0}/>;
            case 'MeshDistanceMaterial':
                return <meshDistanceMaterial {...material} key={index?index:0}/>;
            case 'MeshBasicMaterial':
                return <meshBasicMaterial {...material} wireframe={wire} key={index?index:0}/>
            case 'MeshMatcapMaterial':
                return <meshMatcapMaterial {...material} key={index?index:0}/>
            case 'MeshPhongMaterial':
                return <meshPhongMaterial {...material} wireframe={wire}  key={index?index:0}/>
            case 'MeshLambertMaterial':
                return <meshLambertMaterial {...material} wireframe={wire}  key={index?index:0}/>
            default:
            return <meshBasicMaterial {...material}/>
        }
    }

    const MaterialElements =()=>{
        if(Array.isArray(mesh.material)){
            return (mesh.material as Material[]).map((item,index)=>
                 switchMaterial(item,index)
            )
        }else{
            return switchMaterial(mesh.material);
        }
    }

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
            await setSelectMesh([meshRef]);
        }
    }

        return(
            <>
            {!point?(
                <mesh ref={meshRef} 
            onClick={meshOnClick}
            // onPointerDown={(e)=>{
            //     setSelectMesh([meshRef]);
            // }}
            onPointerMove={(e)=>{
                setHoverMesh(meshRef);
            }}
            onPointerOver={(e)=>{ 
                setHoverMesh(meshRef);
            }}
            onPointerLeave={(e)=>{
                setHoverMesh(undefined)
            }}
            
            name={mesh.name}
            uuid={mesh.uuid}
            geometry={mesh.geometry}
            scale={mesh.scale}
            position={mesh.position}
            quaternion={mesh.quaternion}>
                {MaterialElements()}
                 {commonState?.onText&&(
                        <MeshHtmlComponent 
                        centerPosition={mesh.geometry.boundingSphere?.center!}
                        name={mesh.name}
                        uuid={mesh.uuid} 
                       />
                     )}
            </mesh>
            ):(
                <points
                geometry={mesh.geometry} >
                    <PointMaterial
                      color={"#000000"} 
                     size={0.2}
                    />
                </points>
            )}
            
    
            </>
            
        )
};

//https://yomotsu.github.io/camera-controls/examples/basic.html