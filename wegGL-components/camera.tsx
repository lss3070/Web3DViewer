import {PerspectiveCamera} from '@react-three/drei'
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Box3, Euler, Quaternion, Vector3 } from "three";
import { useCameraSWR } from "../swrs/camera.swr";

export const CameraComponent =()=>{

    const { cameraState,setPosition,setCameraRef }= useCameraSWR();
    const [zoom,setZoom]=useState<number>(1);

    const offset=1;

    const cameraRef = useRef<any>();

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