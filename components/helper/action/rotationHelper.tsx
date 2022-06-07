import { Col, Row, Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useState } from "react";
import { Euler, Vector3 } from "three";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";


interface IRotationHelper{
    rotation:Euler;
    setRotation:Function;
}


export const RotationHelper=({rotation,setRotation}:IRotationHelper)=>{
    const {commonState}=useCommonSWR()
    
    const [localRotation,setLocalRotation]=useState<Euler>(rotation);

    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={localRotation?.x}
            sliderChangeEvent={
                (e:number)=>setLocalRotation(new Euler(+e,localRotation.y,localRotation.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalRotation(new Euler(+e.target.value,localRotation.y,localRotation.z))
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={localRotation?.y}
            sliderChangeEvent={
                (e:number)=>setLocalRotation(new Euler(localRotation.x,e,localRotation.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalRotation(new Euler(localRotation.x,+e.target.value,localRotation.z))
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={localRotation?.z}
            sliderChangeEvent={
                (e:number)=>setLocalRotation(new Euler(localRotation.x,localRotation.y,e))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalRotation(new Euler(localRotation.x,localRotation.y,+e.target.value))
            }
            />
        </div>
    )
}