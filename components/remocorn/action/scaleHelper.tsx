import { Col, Row,Slider } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import {Vector3} from 'three';
import { Helper } from "../../../global/interfaces/app.interface";
import useMeshStore, { useSelectMehsStore } from "../../../store/mesh.store";
import SliderItem from "../common/sliderItem";


interface IScaleProps extends Helper{
}

export const ScaleHelper=({}:IScaleProps)=>{

    const selectMesh =useSelectMehsStore((state)=>state.selectMesh)
    const [scale,setScale]=useState<Vector3>(new Vector3());
    
    const InitScale=()=>{
        if(selectMesh){
            setScale(selectMesh.current.position)
        }
    }
    const setX=(e:number)=>{
        e = isNaN(e)?0:e;
        if(selectMesh){
            selectMesh.current.scale.x=e
        }
        setScale(new Vector3(e,scale.y,scale.z))
    }
    const setY=(e:number)=>{
        e = isNaN(e)?0:e;
        if(selectMesh){
            selectMesh.current.scale.y=e
        }
        setScale(new Vector3(scale.x,e,scale.z))
    }
    const setZ=(e:number)=>{
        e = isNaN(e)?0:e;
        if(selectMesh){
            selectMesh.current.scale.z=e
        }
        setScale(new Vector3(scale.x,scale.y,e))
    }

    useEffect(()=>{
        InitScale()
    },[]);

    useEffect(()=>{
        InitScale()
    },[selectMesh])

    
    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={scale?.x}
            sliderChangeEvent={setX}
            inputChangeEvent={(e)=>setX(+e.target.value)}
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={scale?.y}
            sliderChangeEvent={setY}
            inputChangeEvent={(e)=>setY(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={scale?.z}
            sliderChangeEvent={setZ}
            inputChangeEvent={(e)=>setZ(+e.target.value)}
            />
        </div>
    )
}