import useSWR from "swr";

import { IMenuModal, IMenuStateProps } from "../interfaces/swr.interface";
import { MotionValue } from 'framer-motion';

let menuState:IMenuStateProps={
    OnControl:false,
    OnTreeList:false,
    OnDetail:false,
    simpleControl:{
        on:false
    }
}

export const useMenuSWR=()=>{
    const {data,mutate}=useSWR<IMenuStateProps>('menuStateKey',()=>{
        return menuState;
    });
    return{
        menuState:data,
        onTreeList:async(value:boolean)=>{
            menuState={
                ...menuState,
                OnTreeList:value
            }
            return mutate();
        },
        onControl:async(value:boolean)=>{
            menuState={
                ...menuState,
                OnControl:value
            }
            return mutate();
        },
        onDetail:async(value:boolean)=>{
            menuState={
                ...menuState,
                OnDetail:value
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
        setSimpleControlPosition:async(x:number,
            y:number)=>{
            menuState={
                ...menuState,
                simpleControl:{
                    ...menuState.simpleControl,
                    x:x,y:y
                }
            }
            return mutate();
        }
    }
}