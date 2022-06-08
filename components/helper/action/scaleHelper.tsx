import { Col, Row,Slider } from "antd";
import { ChangeEvent, useState } from "react";
import {Vector3} from 'three';
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";


interface IScaleProps{
    scale:Vector3;
    setScale:Function;
}

export const ScaleHelper=({scale,setScale}:IScaleProps)=>{
    const {commonState}=useCommonSWR()
    
    const [localScale,setLocalScale]=useState<Vector3>(scale);
    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={localScale?.x}
            sliderChangeEvent={
                (e:number)=>{
                    setScale(new Vector3(+e,localScale.y,localScale.z))
                    setLocalScale(new Vector3(+e,localScale.y,localScale.z))
                }
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setScale(new Vector3(+e.target.value,localScale.y,localScale.z))
                    setLocalScale(new Vector3(+e.target.value,localScale.y,localScale.z))
                }
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={localScale?.y}
            sliderChangeEvent={
                (e:number)=>{
                    setScale(new Vector3(localScale.x,e,localScale.z))
                    setLocalScale(new Vector3(localScale.x,e,localScale.z))
                }
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setScale(new Vector3(localScale.x,+e.target.value,localScale.z))
                    setLocalScale(new Vector3(localScale.x,+e.target.value,localScale.z))
                }
                
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={localScale?.z}
            sliderChangeEvent={
                (e:number)=>{
                    setScale(new Vector3(localScale.x,localScale.y,e))
                    setLocalScale(new Vector3(localScale.x,localScale.y,e))
                }
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setScale(new Vector3(localScale.x,localScale.y,+e.target.value))
                    setLocalScale(new Vector3(localScale.x,localScale.y,+e.target.value))
                }
            }
            />
        </div>
    )
}