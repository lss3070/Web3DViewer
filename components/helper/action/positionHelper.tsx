import { Col, Row, Slider } from "antd"
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useMemo, useState } from "react";
import { Vector3 } from "three";
import { Helper } from "../../../interfaces/app.interface";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";

interface IPositionHelper extends Helper{
    position:Vector3;
    setPosition:Function;
}

export const PositionHelper=({position,setPosition}:IPositionHelper)=>{
    
    const [localPosition,setLocalPosition]=useState<Vector3>(position);//only View
    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={localPosition?.x}
            sliderChangeEvent={
                (e:number)=>{
                    setPosition(new Vector3(+e,localPosition.y,localPosition.z))
                    setLocalPosition(new Vector3(+e,localPosition.y,localPosition.z))
                }
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setPosition(new Vector3(+e.target.value,localPosition.y,localPosition.z))
                    setLocalPosition(new Vector3(+e.target.value,localPosition.y,localPosition.z))
                }
               
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={localPosition?.y}
            sliderChangeEvent={
                (e:number)=>{
                    setPosition(new Vector3(localPosition.x,+e,localPosition.z))
                    setLocalPosition(new Vector3(localPosition.x,+e,localPosition.z))
                }
                
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setPosition(new Vector3(localPosition.x,+e.target.value,localPosition.z))
                    setLocalPosition(new Vector3(localPosition.x,+e.target.value,localPosition.z))
                }
               
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={localPosition?.z}
            sliderChangeEvent={
                (e:number)=>{
                    setPosition(new Vector3(localPosition.x,localPosition.y,e))
                    setLocalPosition(new Vector3(localPosition.x,localPosition.y,e))
                }
                
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>{
                    setPosition(new Vector3(localPosition.x,localPosition.y,+e.target.value))
                    setLocalPosition(new Vector3(localPosition.x,localPosition.y,+e.target.value))
                }
                
            }
            />
        </div>
    )
}