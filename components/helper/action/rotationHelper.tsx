import { Col, Row, Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useState } from "react";
import { Euler, Vector3 } from "three";
import { Helper } from "../../../interfaces/app.interface";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";

interface IRotationHelper extends Helper{
    rotation:Euler;
    rotationAxis:Vector3;
    setRotation:Function;
}

export const RotationHelper=({
rotation,rotationAxis,setRotation}:IRotationHelper)=>{
    

    const setX=(e:number)=>{
        setRotation(new Vector3(+e,rotation.y,rotation.z))
    }
    const setY=(e:number)=>{
        setRotation(new Vector3(rotation.x,+e,rotation.z))
    }
    const setZ=(e:number)=>{
        setRotation(new Vector3(rotation.x,rotation.y,e))
    }

    return(
        <div className="w-full">
            <div>

            </div>
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={rotation?.x}
            sliderChangeEvent={setX}
            inputChangeEvent={(e)=>setX(+e.target.value)}
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={rotation?.y}
            sliderChangeEvent={setY}
            inputChangeEvent={(e)=>setY(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={rotation?.z}
            sliderChangeEvent={setZ}
            inputChangeEvent={(e)=>setZ(+e.target.value)}
            />
        </div>
    )
}