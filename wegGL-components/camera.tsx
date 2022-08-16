import {PerspectiveCamera,useCamera} from '@react-three/drei'
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { Box3, Euler, Quaternion, Vector3,CameraHelper } from "three";
import useCameraStore from '../store/camera.store';

export const CameraComponent =()=>{

    const [meshBox,position,setPosition,setCamera]=useCameraStore((state)=>[
        state.meshBox,
        state.position,
        state.setPosition,
        state.setCamera
    ])

    const offset=1;

    const cameraRef = useRef<any>();

    useEffect(()=>{
        if(meshBox){
            const size = meshBox.getSize(new Vector3());

            const maxDim = Math.max(size.x,size.y,size.z);
            const fov = cameraRef.current.fov*(Math.PI/180);
            let cameraZ = Math.abs(maxDim/4*Math.tan(fov*2));
            cameraZ*=offset;

            setPosition(new Vector3(0,0,cameraZ));            
        }},[meshBox]);
    useEffect(()=>{
        setCamera(cameraRef.current)
    },[cameraRef.current])

    return(
        <PerspectiveCamera
        // rotation={new Euler(0,0,0)}
        // up={new Vector3(0,0,0)}
        ref={cameraRef} 
        //  makeDefault// mesh깨짐
        position={position} 
        near={0.1}
        far={200000}
        />
    )
}