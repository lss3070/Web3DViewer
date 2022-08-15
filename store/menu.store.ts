import { RefObject } from "react";
import { Vector3 } from "three";
import create from "zustand";

interface IPosition{
    x:number|string;
    y:number|string;
}

interface IMenuStatePorps{
    onTree:boolean;
    onControl:boolean;
    onMiniControl:boolean;

    treePosition?:IPosition;
    controlPosition?:IPosition;
    miniControlPosition?:IPosition;
   
    dragArea?:RefObject<Element>

    toggleTree:()=>void;
    toggleControl:()=>void;
    toggleMiniControl:()=>void;

    setTreePosition:(treePosition:IPosition)=>void;
    setControlPosition:(controlPosition:IPosition)=>void;
    setMiniControlPosition:(miniControlPosition:IPosition)=>void;
    setDragArea:(element:RefObject<Element>)=>void;
   
}

const useMenuStore= create<IMenuStatePorps>((set)=>({
    onTree:true,
    onControl:true,
    onMiniControl:true,
    toggleTree:()=>set((state)=>({
        ...state,
        onTree:!state.onTree
    })),
    toggleControl:()=>set((state)=>({
        ...state,
        onControl:!state.onControl
    })),
    toggleMiniControl:()=>set((state)=>({
        ...state,
        onMiniControl:!state.onMiniControl
    })),
    setTreePosition:(treePosition:IPosition)=>set((state)=>({
        ...state,
        treePosition
    })),
    setControlPosition:(controlPosition:IPosition)=>set((state)=>({
        ...state,
        controlPosition
    })),
    setMiniControlPosition:(miniControlPosition:IPosition)=>set((state)=>({
        ...state,
        miniControlPosition
    })),
    setDragArea:(dragArea:RefObject<Element>)=>set((state)=>({
        ...state,
        dragArea
    }))
}))

export default useMenuStore