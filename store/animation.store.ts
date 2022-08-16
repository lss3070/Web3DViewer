import { AnimationClip, Vector3 } from "three";
import { STATE } from "three-stdlib";
import create from "zustand";

interface CustomAnimation{
    pre:string;
    cur:string
}

interface IAnimationStateProps{
    onPosition?:boolean;
    onRotation?:boolean;
    onScale?:boolean;
    position?:Vector3;
    rotation?:Vector3;
    scale?:Vector3;
    positionSpeed?:Vector3;
    rotationSpeed?:Vector3;
    scaleSpeed?:Vector3;
    customAnimation?:CustomAnimation;

    customAnimationList?:AnimationClip[];


    setCustomAnimation:(customAnimation:CustomAnimation)=>void;
    setCustomAnimationList:(customAnimationList:AnimationClip[])=>void;

    setOnPosition:(onPosition:boolean)=>void;
    setPosition:(position:Vector3)=>void;
    setPositionSpeed:(positionSpeed:Vector3)=>void;


    setOnRotation:(onRotation:boolean)=>void;
    setRotationSpeed:(rotationSpeed:Vector3)=>void;
}

const useAnimationStore= create<IAnimationStateProps>((set)=>({
    setCustomAnimation:(customAnimation:CustomAnimation)=>set((state)=>({
        ...state,
        customAnimation
    })),
    setCustomAnimationList:(customAnimationList:AnimationClip[])=>set((state)=>({
        ...state,
        customAnimationList
    })),
    setOnPosition:(onPosition:boolean)=>set((state)=>({
        ...state,
        onPosition
    })),
    setPosition:(position:Vector3)=>set((state)=>({
        ...state,
        position
    })),
    setPositionSpeed:(positionSpeed:Vector3)=>set((state)=>({
        ...state,
        positionSpeed
    })),
    setOnRotation:(onRotation:boolean)=>set((state)=>({
        ...state,
        onRotation
    })),
    setRotationSpeed:(rotationSpeed:Vector3)=>set((state)=>({
        ...state,
        rotationSpeed
    }))
}));

export default useAnimationStore;