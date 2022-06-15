import {PerspectiveCamera} from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Box3, Euler, Quaternion, Vector3 } from "three";
import { CustomCameraFocus } from '../interfaces/swr.interface';
import { useCameraSWR } from "../swrs/camera.swr";

export const CameraComponent =()=>{

    const { cameraState,setPosition,setCameraRef,setTarget }= useCameraSWR();
    const [zoom,setZoom]=useState<number>(1);

    const offset=1;

    const cameraRef = useRef<any>();


    // useEffect(()=>{
    //     setTarget(new Vector3(0,0,0))
    //     switch(cameraState?.focus){
    //         case CustomCameraFocus.Front:
    //             setPosition(new Vector3(
    //             0,0,cameraState?.meshBox.max.z!*2
    //             ))
    //             break
    //         case CustomCameraFocus.Back:
    //             setPosition(new Vector3(
    //             0,0,cameraState?.meshBox.min.z!*2
    //             ))
    //             break
    //         case CustomCameraFocus.Left:
    //             setPosition(new Vector3(
    //                 cameraState?.meshBox.max.x!*2,
    //             0,0
    //             ))
    //             break
    //         case CustomCameraFocus.Right:
    //             setPosition(new Vector3(
    //                 cameraState?.meshBox.min.x!*2,
    //             0,0
    //             ))
    //             break
    //         case CustomCameraFocus.Top:
    //             setPosition(new Vector3(
    //                 0,cameraState?.meshBox.max.y!*4,0
    //                 ))
    //             break
    //         case CustomCameraFocus.Bottom:
    //             setPosition(new Vector3(
    //                 0,cameraState?.meshBox.min.y!*4,0
    //                 ))
    //             break
    //     }
    // },[cameraState?.focus])


    

    useEffect(()=>{
        if(cameraState?.meshBox){
            const size = cameraState!.meshBox.getSize(new Vector3());

            const maxDim = Math.max(size.x,size.y,size.z);
            const fov = cameraRef.current.fov*(Math.PI/180);
            let cameraZ = Math.abs(maxDim/4*Math.tan(fov*2));
            cameraZ*=offset;

            setPosition(new Vector3(0,0,cameraZ));            
        }},[cameraState?.meshBox!]);

    useEffect(()=>{
        setCameraRef(cameraRef);
    },[cameraRef, setCameraRef])

    return(
        {zoom}&&<PerspectiveCamera
        ref={cameraRef} 
        makeDefault// mesh깨짐
        position={cameraState?.position!} zoom={zoom}
        near={10}
        far={100000}
        />
    )
}