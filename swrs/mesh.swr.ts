

import useSWR from "swr";
import { Box3 } from "three";
import { IMeshStateProps, MeshMode, ObjectRef } from "../interfaces/swr.interface";

let meshState:IMeshStateProps={
    onInfo:false,
    meshMode:MeshMode.Default,
    staticMeshList:[],
    selectMesh:[]
};

export const useMeshSWR=()=>{
    const {data,mutate}=useSWR<IMeshStateProps>('meshStateKey',()=>{
        return meshState;
    });

    return {
        meshState:data,
        setHoverMesh:async(mesh:ObjectRef|undefined)=>{
            meshState.hoverMesh=mesh 
            meshState={
                ...meshState,
            }
            return mutate();
        },
        setStaticMeshList:async(mesh:ObjectRef)=>{
            const list=[...meshState.staticMeshList,mesh]
            meshState={
                ...meshState,
                staticMeshList:list
            }
            return mutate();
        },
        setSelectMesh:async(mesh:ObjectRef[])=>{
            meshState.selectMesh=mesh
            meshState={
                ...meshState
            }
            return mutate()
        },
        setInfoMesh:async(state:boolean)=>{
            meshState.onInfo=state;
            meshState={
                ...meshState
            }
            return mutate();
        },
        setMeshMode:async(meshMode:MeshMode)=>{
            meshState.meshMode= meshMode;
            meshState={
                ...meshState
            }
            return mutate();
        },
        setMeshTextScale:async(textScale:number)=>{
            meshState.textScale=textScale;
            meshState={
                ...meshState
            }
            return mutate();
        }


        
    }
}