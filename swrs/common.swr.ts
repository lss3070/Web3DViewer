import useSWR from "swr";
import { ICommonStateProps } from "../interfaces/swr.interface";
import { CustomDataNode } from "../interfaces/app.interface";
import { RefObject } from "react";

let commonState:ICommonStateProps={
    onText:false,
    onWire:false,
    onMobile:false,
    darkMode:true
}

export const useCommonSWR=()=>{
    const {data,mutate}=useSWR<ICommonStateProps>('commonStateKey',()=>{
        return commonState;
    });
    return{
        commonState:data,
        setFiltPath:async(filePath:string)=>{
            commonState={
                ...commonState,
                filePath:filePath
            }
            return mutate();
        },
        setFileExtension:async(extension:string)=>{
            commonState={
                ...commonState,
                extension:extension
            }
            return mutate();
        },
        setGroupList:async(value:CustomDataNode[])=>{
            commonState={
                ...commonState,
                groupList:value
            }
            return mutate();
        },
        setScene:async(value:any)=>{
            commonState={
                ...commonState,
                scene:value
            }
            return mutate();
        },
        setOnText:async(onText:boolean)=>{
            commonState={
                ...commonState,
                onText
            }
            return mutate();
        },
        setOnWire:async(onWire:boolean)=>{
            commonState={
                ...commonState,
                onWire
            }
            return mutate();
        },
        setOnMobile:async(onMobile:boolean)=>{
            commonState={
                ...commonState,
                onMobile
            }
            return mutate();
        },
        setMobileHelper:async(mobileHelperComponent:JSX.Element)=>{
            commonState = {
                ...commonState,
                mobileHelperComponent
            }
            return mutate();
        },
        setDarkMode:async(darkMode:boolean)=>{
            commonState = {
                ...commonState,
                darkMode
            }
            return mutate();
        },        
    }
}