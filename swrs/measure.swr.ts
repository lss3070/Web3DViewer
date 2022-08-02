import useSWR from "swr";

import { Vector3 } from "three";
import { CustomAnimationList, IMeasureSWR } from "../global/interfaces/swr.interface";

let measureState:IMeasureSWR={
    point:[],
    onMeasure:false
}

export const useMeasureSWR=()=>{
    const {data,mutate}=useSWR<IMeasureSWR>('measureStateKey',()=>{
        return measureState;
    });
    return{
        measureState:data,
        setOnMeasure:async(onMeasure:boolean)=>{
            measureState={
                ...measureState,
                onMeasure
            }
            return mutate();
        },
        setPoint:async(point:Vector3)=>{
            measureState.point.push(point.x);
            measureState.point.push(point.y);
            measureState.point.push(point.z);
            measureState={
                ...measureState,
                point:[...measureState.point]
            }
            return mutate();
        }
    }
}