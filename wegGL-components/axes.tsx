import { TrackballControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useCameraSWR } from '../swrs/camera.swr';
import {useState} from 'react';
import { Vector3 } from 'three';

const Axes=()=>{
    const {cameraState}=useCameraSWR();


    // const [position,setPosition] = useState<Vector3>(cameraState?.axes!)
    const control = useRef<any>();
    const as=useRef<any>();
    

    useEffect(()=>{
        if(control){
            control.current?.object.position.set(
                cameraState?.axes.x,
                cameraState?.axes.y,
                cameraState?.axes.z
                )
        }
    },[cameraState?.axes])

    return(
        <Canvas style={{position:"absolute",left:'0',bottom:'0',width:'100px',height:'100px',
                zIndex:20}}>     
                <scene>
                    <axesHelper args={[10000]} ref={as}/>

                    <TrackballControls 
                    ref={control}
                    noZoom={true}
                    noPan={false}/>
                </scene>
        </Canvas>
    )
}

export default Axes;