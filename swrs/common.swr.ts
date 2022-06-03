import useSWR from "swr";
import { ICommonStateProps } from "../interfaces/swr.interface";
import { CustomDataNode } from "../interfaces/app.interface";

let commonState:ICommonStateProps={
    textAble:false,
    onMobile:false
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
        setTextAble:async(textAble:boolean)=>{
            commonState={
                ...commonState,
                textAble
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
        }
    }
}