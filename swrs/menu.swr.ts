import useSWR from "swr";

import { IMenuModal, IMenuStateProps } from "../interfaces/swr.interface";
import { RefObject } from "react";


let menuState:IMenuStateProps={
    treeList:{
        on:true,
    },
    control:{
        on:true,
    },
    simpleControl:{
        on:true,
    }
}

export const useMenuSWR=()=>{
    const {data,mutate}=useSWR<IMenuStateProps>('menuStateKey',()=>{
        return menuState;
    });
    return{
        menuState:data,
        onTreeList:async(on:boolean)=>{
            menuState={
                ...menuState,
                treeList:{
                    ...menuState.treeList,
                    on
                }
            }
            return mutate();
        },
        onControl:async(on:boolean)=>{
            menuState={
                ...menuState,
                control:{
                    ...menuState.control,
                    on
                }
            }
            return mutate();
        },
        onSimpleControl:async(on:boolean)=>{
            menuState={
                ...menuState,
                simpleControl:{
                    ...menuState.simpleControl,
                    on
                }
            }
            return mutate();
        },
        setSimpleControlPosition:async(x:number|string,
            y:number|string)=>{
            menuState={
                ...menuState,
                simpleControl:{
                    ...menuState.simpleControl,
                    position: {
                        x:x,y:y
                    }
                }
            }
            return mutate();
        },

        setTreeListPosition:async(x:number|string,
            y:number|string)=>{
            menuState={
                ...menuState,
                treeList:{
                    ...menuState.treeList,
                    position: {
                        x:x,y:y
                    }
                }
            }
            return mutate();
        },
        setControlPosition:async(x:number|string,
            y:number|string)=>{
            menuState={
                ...menuState,
                control:{
                    ...menuState.control,
                    position: {
                        x:x,y:y
                    }
                }
            }
            return mutate();
        },
        setDragArea:async(dragArea:RefObject<Element>)=>{
            menuState={
                ...menuState,
                dragArea    
            }
        }
    }
}