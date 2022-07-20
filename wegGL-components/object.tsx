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
    console.log(group)
    let mixer:AnimationMixer 

    // if (group.animations.length) {
    //     mixer = new AnimationMixer(group);
    //     group.animations.forEach(clip => {
    //         if(clip.name==="mixamo.com"){
    //             const action = mixer.clipAction(clip);
    //             action.play();
    //         }
    //     });
    // }
  
    const {animationState}=useAnimationSWR();
    const ref=useRef<Group>(null);
    const {actions}=useAnimations(group.animations,ref)
    const [currentAnimation,setCurrentAnimation]=useState<string>('')
    const {setMeshBox}=useCameraSWR();


    const [load,setOnload]=useState<boolean>(false);
    useEffect(()=>{
        if(animationState?.customAnimation===''){
            actions[currentAnimation]?.stop()
        }else{
            actions[animationState?.customAnimation!]?.play()
            setCurrentAnimation(animationState?.customAnimation!);
        }
    },[animationState?.customAnimation]);


    useEffect(()=>{
        new Box3().setFromObject(ref.current!).getCenter(ref.current?.position!)
        .multiplyScalar(-1);


        const box = new Box3().setFromObject(ref.current!);
        setMeshBox(box);

    },[load])

    // if (ref.current?.animations.length) {
    //     mixer = new AnimationMixer(ref.current);
    //     ref.current.animations.forEach(clip => {
    //         if(clip.name==="mixamo.com"){
    //             console.log(clip);
    //             const action = mixer.clipAction(clip);
    //             action.play();
    //         }
    //     });
    // }
   


//     useFrame((state, delta) => {
//         if(animationState?.customAnimation){
// console.log('!!')
//             mixer?.update(delta)
//         }
     
//     })

    
    return(
        <group ref={ref}
        {...group}
        name="group" >
            {group.children&&(
                <SwitchObject complete={setOnload} objectList={group.children}/> 
            )}
           
        </group>
    )
}
export default ObjectComponent