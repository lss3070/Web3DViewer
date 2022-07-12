import { Col, Row,Slider } from "antd";
import { ChangeEvent, useState } from "react";
import {Vector3} from 'three';
import { Helper } from "../../../interfaces/app.interface";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";


interface IScaleProps extends Helper{
    scale:Vector3;
    setScale:Function;
}

export const ScaleHelper=({scale,setScale}:IScaleProps)=>{
    
    const setX=(e:number)=>{
        setScale(new Vector3(+e,scale.y,scale.z))
    }
    const setY=(e:number)=>{
        setScale(new Vector3(scale.x,+e,scale.z))
    }
    const setZ=(e:number)=>{
        setScale(new Vector3(scale.x,scale.y,e))
    }


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