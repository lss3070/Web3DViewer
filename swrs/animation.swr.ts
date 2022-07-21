import useSWR from "swr";

import { Vector3 } from "three";
import { CustomAnimationList, IAnimationStateProps } from "../interfaces/swr.interface";

let animationState:IAnimationStateProps

export const useAnimationSWR=()=>{
    const {data,mutate}=useSWR<IAnimationStateProps>('animationStateKey',()=>{
        return animationState;
    });
    return{
        animationState:data,
        onPosition:async(onPosition:boolean)=>{
            animationState={
                ...animationState,
                onPostion:onPosition
            }
            return mutate();
        },
        setPosition:async(position:Vector3)=>{
            animationState={
                ...animationState,
                position:position
            }
            return mutate();
        },
        setPositionSpeed:async(speed:Vector3)=>{
            animationState={
                ...animationState,
                positionSpeed:speed
            }
            return mutate();
        },
        onRotation:async(onRotation:boolean)=>{
            animationState={
                ...animationState,
                onRotation:onRotation
            }
            return mutate();
        },
        setRotation:async(rotation:Vector3)=>{
            animationState={
                ...animationState,
                rotation:rotation
            }
            return mutate();
        },
        setRotationSpeed:async(rotationSpeed:Vector3)=>{
            animationState={
                ...animationState,
                rotationSpeed:rotationSpeed
            }
            return mutate();
        },
        onScale:async(onScale:boolean)=>{
            animationState={
                ...animationState,
                onScale:onScale
            }
            return mutate();
        },
        setScale:async(scale:Vector3)=>{
            animationState={
                ...animationState,
                scale:scale
            }
            return mutate();
        },
        setScaleSpeed:async(scaleSpeed:Vector3)=>{
            animationState={
                ...animationState,
                scaleSpeed:scaleSpeed
            }
            return mutate();
        },
        setCustomAnimation:async(customAnimation:CustomAnimationList)=>{
            animationState={
                ...animationState,
                customAnimation:customAnimation
            }
            return mutate();
        }
    }
}