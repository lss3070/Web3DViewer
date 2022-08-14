import { Vector3 } from 'three';
import create from 'zustand';

interface IMeasureStateProps{
    points:Vector3[],
    onMeasure:boolean,
    selectPoints:Vector3[],
    hoverPoint:number[],
    setPoint:(point:Vector3)=>void;
    toggleMeasure:()=>void;
    setSelectMeasure:(selectPoints:Vector3[])=>void;
    initMeasure:()=>void;
    deleteMeasure:()=>void;
}

const useMeasureStore= create<IMeasureStateProps>((set)=>({
    points:[],
    onMeasure:false,
    selectPoints:[],
    hoverPoint:[0,0,0],
    setPoint:(point:Vector3)=>set((state)=>({
        ...state,
        points:[
            ...state.points,
            point
        ]
    })),
    toggleMeasure:()=>set((state)=>({
        ...state,
        onMeasure:!state.onMeasure
    })),
    setSelectMeasure:(selectPoints:Vector3[])=>set((state)=>({
        ...state,
        selectPoints:selectPoints
    })),
    initMeasure:()=>set((state)=>({
        ...state,
        onMeasure:false,
        point:[],
        selectPoint:[]
    })),
    deleteMeasure:()=>set((state)=>({
        ...state,
        points:state.points.filter((item)=>
        !(item.equals(state.selectPoints[0])||item.equals(state.selectPoints[1]))),
        selectPoint:[]
    }))

}))

export default useMeasureStore;