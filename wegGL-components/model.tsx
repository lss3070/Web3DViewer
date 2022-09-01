import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect, useState, memo, Suspense } from 'react';
import { AnimationMixer, Bone, Box3, Group, Mesh, Vector3 } from "three"
import SwitchObject from './switch-object';
import { Bounds, useAnimations, useBounds } from '@react-three/drei';
import useMeshStore from '../store/mesh.store';
import { useMeshBoxStore, useZoomBoxStore } from '../store/camera.store';
import useAnimationStore from '../store/animation.store';
import _ from 'lodash';
import { useSelectMehsStore } from '../store/mesh.store';

interface IObjectComponentProps{
    group:Group;
    bone?:Bone
}

const ModelComponent=({group}:IObjectComponentProps)=>{
    const [onPosition,onRotation,
        position,
        positionSpeed,
        rotationSpeed,
        customAnimation,
        setOnPosition,
    ]=useAnimationStore((state)=>[
        state.onPosition,
        state.onRotation,
        state.position,
        state.positionSpeed,
        state.rotationSpeed,
        state.customAnimation,
        state.setOnPosition
    ])
    
    const selectMesh = useSelectMehsStore((state)=>state.selectMesh)
    const setZoomBox = useZoomBoxStore((state)=>state.setZoomBox);
    const setMeshBox=useMeshBoxStore((state)=>state.setMeshBox)

    const ref=useRef<Group>(null);
    const {actions}=useAnimations(group.animations,ref)
    const [onAnimation,setOnAnimation]=useState<boolean>(false);
    const api = useBounds()

    const [curSelectMesh,setCurSelectMesh]=useState<Mesh>();

    useEffect(()=>{
        actions[customAnimation?.pre!]?.stop();
        actions[customAnimation?.cur!]?.play();
    },[customAnimation]);


    useEffect(()=>{
        const box = new Box3().setFromObject(group);
        setMeshBox(box);
        setZoomBox({
            box:_.cloneDeep(box)
        })
    },[group])


    useEffect(()=>{
        const value= onPosition||onRotation

        if(value){
            setOnAnimation(value)
            setCurSelectMesh(selectMesh?.current as Mesh)
        }else{
            setOnAnimation(false)
            setCurSelectMesh(undefined)
        }
    },[onPosition,onRotation
    ])


    useFrame(()=>{
        if(onAnimation){
            positionAnimation()
            roationAnimation()
        }
    })


    const positionAnimation=()=>{
        if(onPosition){
            let count=0
            if(curSelectMesh?.position.x!<position?.x!){
                curSelectMesh?.position.setX(
                    curSelectMesh?.position.x
                    +positionSpeed?.x!)
                    count++;
            }
                
            if(curSelectMesh?.position.y!<position?.y!){
                curSelectMesh?.position.setY(
                    curSelectMesh?.position.y
                    +positionSpeed?.y!)
                    count++;
            }
                
            if(curSelectMesh?.position.z!<position?.z!){
                curSelectMesh?.position.setZ(
                    curSelectMesh?.position.z
                    +positionSpeed?.z!)
                    count++
            }
            count===0&&setOnPosition(false)
        }
    }
    const roationAnimation=()=>{
        if(onRotation){
            curSelectMesh?.rotation.set(
                curSelectMesh.rotation.x+rotationSpeed?.x!,
                curSelectMesh.rotation.y+rotationSpeed?.y!,
                curSelectMesh.rotation.z+rotationSpeed?.z!);
        }
    }
    
    return(
            <group 
            ref={ref} 
            dispose={null}
        
            {...group}
            onDoubleClick={(e)=>{
                api.refresh(e.object).fit()
                }}
            name="group"
             >
                {group.children&&(

                        <SwitchObject objectList={group.children}/>
                )}
            </group>
    )
}
export default memo(ModelComponent) 