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
    

    const setX=(e:number)=>{
        setPosition(new Vector3(+e,position.y,position.z))
    }
    const setY=(e:number)=>{
        setPosition(new Vector3(position.x,+e,position.z))
    }
    const setZ=(e:number)=>{
        setPosition(new Vector3(position.x,position.y,e))
    }

    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={position?.x}
            sliderChangeEvent={setX}
            inputChangeEvent={(e)=>setX(+e.target.value)}
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={position?.y}
            sliderChangeEvent={setY}
            inputChangeEvent={(e)=>setY(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={position?.z}
            sliderChangeEvent={setZ}
            inputChangeEvent={(e)=>setZ(+e.target.value)}
            />
        </div>
    )
}