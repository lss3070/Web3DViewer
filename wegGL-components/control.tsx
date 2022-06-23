import { TrackballControls, TrackballControlsProps } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from 'react';
import { Vector3,PerspectiveCamera, Mesh } from "three";
import _ from 'lodash'
import { useCameraSWR } from "../swrs/camera.swr";

export const ControlComponent=()=>{
    const { cameraState,setControlRef,
        setPosition,
        setTarget,
        setSelectMeshBox,
        setAxes
    }= useCameraSWR();

    const [onZooming,setOnZooming]=useState<boolean>(false);

    const [zoomTarget,setZoomTarget]=useState<Vector3>(new Vector3());
    const [zoomPosition,setZoomPosition]=useState<Vector3>(new Vector3());

    const controlRef=useRef<any>()

    useEffect(()=>{
        if(cameraState){
            controlRef.current.enabled=cameraState?.moveMode;
        }
    },[cameraState?.moveMode])

    useEffect(()=>{
        setControlRef(controlRef)
    },[controlRef]);

    useEffect(()=>{
        if(!cameraState?.selectMeshBox) return
        const size= cameraState?.selectMeshBox?.getSize(new Vector3());
        const center = cameraState?.selectMeshBox?.getCenter(new Vector3());

        const maxSize = Math.max(size!.x,size!.y,size!.z);
        const fitHeightDistance= maxSize/(2*Math.atan((Math.PI*controlRef.current.object.fov)/360));
        const fitWidthDistance = fitHeightDistance / controlRef.current.object.aspect;
        const distance = 1.2*Math.max(fitHeightDistance,fitWidthDistance);

        const direction= controlRef.current.target
        .clone()
        .sub(controlRef.current.object.position)
        .normalize()
        .multiplyScalar(distance);
        setZoomTarget(center);

        controlRef.current.object.near = distance/100;
        controlRef.current.object.far = distance*100;
        controlRef.current.object.updateProjectionMatrix();

        const position = _.cloneDeep(controlRef.current.object.position)

        setZoomPosition(position.copy(controlRef.current.target).sub(direction))
         
        setOnZooming(true);
    },[cameraState?.selectMeshBox]);


    useFrame(()=>{
        const step=0.05;
        if( onZooming){
            try{
                if(controlRef.current.object.position.x.toFixed(1)==zoomPosition.x.toFixed(1)&&
                controlRef.current.object.position.y.toFixed(1)==zoomPosition.y.toFixed(1)&&
                controlRef.current.object.position.z.toFixed(1)==zoomPosition.z.toFixed(1)){
                    setOnZooming(false);
                }else{
                    controlRef.current.target.lerp(zoomTarget,0.1)
                    // controlRef.current.object.lookAt(target)
                    controlRef.current.object.position.lerp(zoomPosition,0.1);
                    controlRef.current.update();
                    controlRef.current.object.updateProjectionMatrix();
                }
            }catch(err){
                console.log(err);
            }
        }
    });
    
    const onChangeEvent=(e:any)=>{
        console.log(e.target);
        const position={
            isVector3:true,
            x:controlRef.current.lastPosition.x,
            y:controlRef.current.lastPosition.y,
            z:controlRef.current.lastPosition.z,
        } as Vector3
        console.log(e.target);
        console.log(e.target.rotateCamera())
        console.log(position);
        // setPosition(position)
        // setAxes(position)
    }

    return(
        <TrackballControls 
        
        noPan={false}
        onChange={onChangeEvent}
        // onEnd={onChangeEvent}
        ref={controlRef} 
        target={cameraState?.target}
        
        />
    )
}
//https://codesandbox.io/s/three-fiber-zoom-to-object-camera-controls-solution-final-forked-d5ebf?file=/src/App.js

//https://codepen.io/discoverthreejs/full/vwVeZB