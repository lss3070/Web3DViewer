import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from 'react';
import { AnimationMixer, Bone, Box3, Group } from "three"
import SwitchObject from './switch-object';
import { useAnimations } from '@react-three/drei';
import { useMenuSWR } from '../swrs/menu.swr';
import { useAnimationSWR } from '../swrs/animation.swr';
import { useCameraSWR } from "../swrs/camera.swr";

interface IObjectComponentProps{
    group:Group;
    bone?:Bone
}

const ObjectComponent=({group,bone}:IObjectComponentProps)=>{
   
    const {animationState}=useAnimationSWR();
    const ref=useRef<Group>(null);
    const {actions}=useAnimations(group.animations,ref)
    const [currentAnimation,setCurrentAnimation]=useState<string>('')
    const {setMeshBox}=useCameraSWR();

    useEffect(()=>{
        if(animationState?.customAnimation===''){
            actions[currentAnimation]?.stop()
        }else{
            actions[animationState?.customAnimation!]?.play()
            setCurrentAnimation(animationState?.customAnimation!);
        }
    },[animationState?.customAnimation]);


    useEffect(()=>{
        const box = new Box3().setFromObject(group);
        setMeshBox(box);
    },[group])

    useEffect(()=>{
        new Box3().setFromObject(ref.current!).getCenter(ref.current?.position!)
        .multiplyScalar(-1);
    },[ref.current])

    return(
        <group ref={ref}
        {...group}
        name="group" >
            {group.children&&(
                <SwitchObject objectList={group.children}/> 
            )}
           
        </group>
    )
}
export default ObjectComponent