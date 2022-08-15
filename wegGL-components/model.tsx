import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState, memo } from 'react';
import { AnimationMixer, Bone, Box3, Group, Mesh, Vector3 } from "three"
import SwitchObject from './switch-object';
import { Bounds, useAnimations, useBounds } from '@react-three/drei';
import { useAnimationSWR } from '../swrs/animation.swr';
import { useCameraSWR } from "../swrs/camera.swr";
import { useMeshSWR } from "../swrs/mesh.swr";

interface IObjectComponentProps{
    group:Group;
    bone?:Bone
}

const ModelComponent=({group,bone}:IObjectComponentProps)=>{

    const {animationState,onPosition,onRotation}=useAnimationSWR();
    const {meshState}=useMeshSWR()
    const ref=useRef<Group>(null);
    const {actions}=useAnimations(group.animations,ref)
    const [onAnimation,setOnAnimation]=useState<boolean>(false);
    const {setMeshBox}=useCameraSWR();
    const api = useBounds()
    const three = useThree();

    const [curSelectMesh,setCurSelectMesh]=useState<Mesh>();

    useEffect(()=>{
        actions[animationState?.customAnimation?.pre!]?.stop();
        actions[animationState?.customAnimation?.cur!]?.play();
    },[animationState?.customAnimation]);


    useEffect(()=>{
        const box = new Box3().setFromObject(group);
       
        setMeshBox(box);

    },[group])


    useEffect(()=>{
        const value= animationState?.onPostion||
        animationState?.onRotation||
        animationState?.onScale

        if(value){
            setOnAnimation(value)
            setCurSelectMesh(meshState?.selectMesh?.current as Mesh)
        }else{
            setOnAnimation(false)
            setCurSelectMesh(undefined)
        }
    },[animationState?.onPostion,
        animationState?.onRotation,
        animationState?.onScale
    ])


    useFrame(()=>{
        if(onAnimation){
            positionAnimation()
            roationAnimation()
        }
    })


    const positionAnimation=()=>{
        if(animationState?.onPostion){
            let count=0
            if(curSelectMesh?.position.x!<animationState.position.x){
                curSelectMesh?.position.setX(
                    curSelectMesh?.position.x
                    +animationState.positionSpeed.x)
                    count++;
            }
                
            if(curSelectMesh?.position.y!<animationState.position.y){
                curSelectMesh?.position.setY(
                    curSelectMesh?.position.y
                    +animationState.positionSpeed.y)
                    count++;
            }
                
            if(curSelectMesh?.position.z!<animationState.position.z){
                curSelectMesh?.position.setZ(
                    curSelectMesh?.position.z
                    +animationState.positionSpeed.z)
                    count++
            }
            count===0&&onPosition(false)
        }


    }
    const roationAnimation=()=>{
        if(animationState?.onRotation){
            curSelectMesh?.rotation.set(
                curSelectMesh.rotation.x+animationState.rotationSpeed.x,
                curSelectMesh.rotation.y+animationState.rotationSpeed.y,
                curSelectMesh.rotation.z+animationState.rotationSpeed.z);
        }
    }

    useEffect(()=>{
        console.log(three.gl);

    },[])


    return(
            <group ref={ref} dispose={null}
            {...group}
            onDoubleClick={(e)=>{
                api.refresh(e.object).fit()
                }}
            name="group" >
                {group.children&&(
                    <SwitchObject objectList={group.children}/> 
                )}
            </group>
    )
}
export default memo(ModelComponent) 