import create from "zustand";
import { ObjectRef } from "../global/interfaces/swr.interface";

interface IMeshStateProps{
    staticMeshList?:ObjectRef[],
    onWire:boolean;

    setToggleWire:()=>void;
    setHoverMesh:(hoverMesh:ObjectRef|undefined)=>void;
    setStaticMeshList:(mesh:ObjectRef)=>void;
}
interface ISelectMeshProps{

    selectMesh?:ObjectRef;
    setSelectMesh:(selectMesh:ObjectRef|undefined)=>void;
    setInitSelectMesh:()=>void;
}

export const useSelectMehsStore = create<ISelectMeshProps>((set)=>({
    setSelectMesh:(selectMesh:ObjectRef|undefined)=>set((state)=>({
        ...state,
        selectMesh:selectMesh?.current.uuid===state.selectMesh?.current.uuid?
        undefined:
        selectMesh
    })),
    setInitSelectMesh:()=>set((state)=>({
        ...state,
        selectMesh:undefined
    })),
}))

const useMeshStore= create<IMeshStateProps>((set)=>({
    onWire:false,
    setToggleWire:()=>set((state)=>({
        ...state,
        onWire:!state.onWire
    })),
    setHoverMesh:(hoverMesh:ObjectRef|undefined)=>set((state)=>({
        ...state,
        hoverMesh
    })),
    setStaticMeshList:(mesh)=>set((state)=>({
        ...state,
        staticMeshList:state.staticMeshList?[...state.staticMeshList,mesh]:[mesh]
    })),
}));

export default useMeshStore;