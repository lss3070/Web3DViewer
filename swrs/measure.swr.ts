import useSWR from "swr";

import { Vector3 } from "three";
import { CustomAnimationList, IMeasureSWR } from "../global/interfaces/swr.interface";

let measureState:IMeasureSWR={
    point:[],
    onMeasure:false,
    selectPoint:[],
    hoverPoint:[0,0,0]
}

export const useMeasureSWR=()=>{
    const {data,mutate}=useSWR<IMeasureSWR>('measureStateKey',()=>{
        return measureState;
    });
    return{
        measureState:data,
        setOnMeasure:async(onMeasure:boolean)=>{
            const selectPoint= []
            measureState={
                ...measureState,
                onMeasure,
                selectPoint
            }
            return mutate();
        },
        setPoint:async(point:Vector3)=>{
            measureState.point.push(point);
            measureState={
                ...measureState,
                point:[...measureState.point]
            }
            return mutate();
        },
        setHoverPoint:async(point:number[])=>{
            measureState={
                ...measureState,
                hoverPoint:point
            }
            return mutate();
        },
        setSelectMeasure:async(selectPoint:Vector3[])=>{
            // const list= measureState.point.filter((item)=>!(item.equals(selectPoint[0])||item.equals(selectPoint[1])));
            measureState={
                ...measureState,
                selectPoint
            }
            return mutate();
        },
        deleteSelectMeasure:async()=>{
         
            const point =measureState.selectPoint!;
            if(point?.length>1){
                const list= measureState.point.filter((item)=>
                !(item.equals(point[0])||item.equals(point[1])));

                measureState={
                    ...measureState,
                    point:[...list],
                    selectPoint:undefined
                }
            }
            return mutate();
        },
        initMeasure:async()=>{
            measureState={
                ...measureState,
                onMeasure:false,
                point:[],
                selectPoint:undefined
            }
            return mutate();
        }
    }
}