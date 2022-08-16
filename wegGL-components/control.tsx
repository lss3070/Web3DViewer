import { TrackballControls, TrackballControlsProps, useCamera } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState, ChangeEvent } from 'react';
import { Vector3,PerspectiveCamera, Mesh } from "three";
import _ from 'lodash'
import useCameraStore from '../store/camera.store';

export const ControlComponent=()=>{

    const [zoomBox,onZoom,setOnZoom]=useCameraStore((state)=>[
        state.zoomBox,
        state.onZoom,
        state.setOnZoom
    ])


    const [target]=useCameraStore((state)=>[state.target])

    const setControlRef=useCameraStore((state)=>state.setControlRef)

    const [zoomTarget,setZoomTarget]=useState<Vector3>(new Vector3());
    const [zoomPosition,setZoomPosition]=useState<Vector3>(new Vector3());
    

    const controlRef=useRef<any>()

    // useEffect(()=>{
    //     if(cameraState){
    //         controlRef.current.enabled=cameraState?.moveMode;
    //     }
    // },[cameraState?.moveMode])

    useEffect(()=>{
        setControlRef(controlRef.current)
    },[controlRef]);

    useEffect(()=>{
        if(!zoomBox) return
       
        const center =zoomBox.target?zoomBox.target:
        zoomBox.box?.getCenter(new Vector3())

        if(!zoomBox.position){
            const size= zoomBox?.box?.getSize(new Vector3());
            const maxSize = Math.max(size!.x,size!.y,size!.z);
            const fitHeightDistance= maxSize/(2*Math.atan((Math.PI*controlRef.current.object.fov)/360));
            const fitWidthDistance = fitHeightDistance / controlRef.current.object.aspect;
            const distance = 1.2*Math.max(fitHeightDistance,fitWidthDistance);
    
            const direction= controlRef.current.target
            .clone()
            .sub(controlRef.current.object.position)
            .normalize()
            .multiplyScalar(distance);
    
            // center.applyMatrix4(controlRef.current.object.matrixWorldInverse);
    
            setZoomTarget(center!);
    
            controlRef.current.object.near = distance/1000;
            controlRef.current.object.far = distance*1000;
            controlRef.current.object.updateProjectionMatrix();
    
            const position = _.cloneDeep(controlRef.current.object.position)
    
            const ee =position.copy(controlRef.current.target).sub(direction) as Vector3

            setZoomPosition(position.copy(controlRef.current.target).sub(direction))
        }else{
            setZoomPosition(zoomBox.position)
        }
      
        // setZoomPosition(position.copy(controlRef.current.target).sub(direction))
        
        // setZoomPosition(cameraState?.selectMeshBox.max)
         
        setOnZoom(true);
    },[zoomBox])


    useFrame((e,q)=>{
        const step=0.05;
        if( onZoom){
            try{
                
                if(
                    controlRef.current.object.position.x.toFixed(1)==zoomPosition.x.toFixed(1)&&
                    controlRef.current.object.position.y.toFixed(1)==zoomPosition.y.toFixed(1)&&
                    controlRef.current.object.position.z.toFixed(1)==zoomPosition.z.toFixed(1)
                ){
                    setOnZoom(false);
                }else{

                    controlRef.current.target.lerp(zoomTarget,step)

       
                    controlRef.current.object.position.lerp(zoomPosition,step);

                    controlRef.current.update();
                    controlRef.current.object.updateProjectionMatrix();
                }
            }catch(err){
                console.log(err);
            }
        }
    });

    

    return(
        <TrackballControls 
        enabled={true}
        maxDistance={200000}
        noPan={false}
        // onChange={onChangeEvent}
        // onEnd={onChangeEvent}
        ref={controlRef} 
        target={target}
        makeDefault
        />
    )
}
//https://codesandbox.io/s/three-fiber-zoom-to-object-camera-controls-solution-final-forked-d5ebf?file=/src/App.js

//https://codepen.io/discoverthreejs/full/vwVeZB