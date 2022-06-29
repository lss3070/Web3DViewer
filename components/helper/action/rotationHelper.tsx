import { Col, Row, Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useState } from "react";
import { Euler, Vector3 } from "three";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";

interface IRotationHelper{
    rotation:Euler;
    rotationAxis:Vector3;
    setRotation:Function;
}

export const RotationHelper=({rotation,rotationAxis,setRotation}:IRotationHelper)=>{
    
    const {commonState}=useCommonSWR()
    const [localRotation,setLocalRotation]=useState<Euler>(rotation);

    return(
        <div className="w-full">
            <div>

            </div>
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={localRotation?.x}
            sliderChangeEvent={
                (e:number)=>{
                    setRotation(new Euler(+e,localRotation.y,localRotation.z))
                    setLocalRotation(new Euler(+e,localRotation.y,localRotation.z))
                }
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setRotation(new Euler(+e.target.value,localRotation.y,localRotation.z))
                    setLocalRotation(new Euler(+e.target.value,localRotation.y,localRotation.z))
                }
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={localRotation?.y}
            sliderChangeEvent={
                (e:number)=>{
                    setRotation(new Euler(localRotation.x,e,localRotation.z))
                    setLocalRotation(new Euler(localRotation.x,e,localRotation.z))
                }
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setRotation(new Euler(localRotation.x,+e.target.value,localRotation.z))
                    setLocalRotation(new Euler(localRotation.x,+e.target.value,localRotation.z))
                }
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={localRotation?.z}
            sliderChangeEvent={
                (e:number)=>{
                    setRotation(new Euler(localRotation.x,localRotation.y,e))
                    setLocalRotation(new Euler(localRotation.x,localRotation.y,e))
                }
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setRotation(new Euler(localRotation.x,localRotation.y,+e.target.value))
                    setLocalRotation(new Euler(localRotation.x,localRotation.y,+e.target.value))
                }
            }
            />
        </div>
    )
}