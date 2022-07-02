import useSWR from "swr";
import { FileInfo, ICommonStateProps } from "../interfaces/swr.interface";
import { CustomDataNode } from "../interfaces/app.interface";
import { RefObject } from "react";

let commonState:ICommonStateProps={
    onMobile:false,
    darkMode:true,
    fileLoad:false
}

export const useCommonSWR=()=>{
    const {data,mutate}=useSWR<ICommonStateProps>('commonStateKey',()=>{
        return commonState;
    });
    return{
        commonState:data,
        setFiltPath:async(filePath:FileInfo)=>{
            commonState={
                ...commonState,
                fileInfo:filePath
            }
            return mutate();
        },
        // setFileExtension:async(extension:string)=>{
        //     commonState={
        //         ...commonState,
        //         extension:extension
        //     }
        //     return mutate();
        // },
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
        setFileLoad:async(fileLoad:boolean)=>{
            commonState={
                ...commonState,
                fileLoad
            }
            return mutate()
        },
        // setFIleName:async(fileName:string)=>{
        //     commonState={
        //         ...commonState,
        //         fileName
        //     }
        //     return mutate()
        // },
        setFileUuid:async(fileUuid:string)=>{
            commonState={
                ...commonState,
                fileUuid
            }
            return mutate()
        }
    }
}