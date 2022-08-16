import create from "zustand";
import { ObjectRef } from "../global/interfaces/swr.interface";

interface IMeshStateProps{
    hoverMesh?:ObjectRef;
    selectMesh?:ObjectRef;
    staticMeshList?:ObjectRef[],
    onWire:boolean;

    setToggleWire:()=>void;
    setSelectMesh:(selectMesh:ObjectRef|undefined)=>void;
    setHoverMesh:(hoverMesh:ObjectRef|undefined)=>void;
    setStaticMeshList:(mesh:ObjectRef)=>void;
    setInitSelectMesh:()=>void;
}

const useMeshStore= create<IMeshStateProps>((set)=>({
    onWire:false,
    setToggleWire:()=>set((state)=>({
        ...state,
        onWire:!state.onWire
    })),
    setSelectMesh:(selectMesh:ObjectRef|undefined)=>set((state)=>({
        ...state,
        selectMesh:selectMesh?.current.uuid===state.selectMesh?.current.uuid?
        undefined:
        selectMesh
    })),
    setHoverMesh:(hoverMesh:ObjectRef|undefined)=>set((state)=>({
        ...state,
        hoverMesh
    })),
    setStaticMeshList:(mesh)=>set((state)=>({
        ...state,
        staticMeshList:state.staticMeshList?[...state.staticMeshList,mesh]:[mesh]
    })),
    setInitSelectMesh:()=>set((state)=>({
        ...state,
        selectMesh:undefined
    })),
}));

export default useMeshStore;