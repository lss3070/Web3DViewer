import { Button, Col, Input, Row,Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile';
import { ChangeEvent, useState } from "react";
import { Vector3 } from "three";
import { Helper } from "../../../global/interfaces/app.interface";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import { useCommonSWR } from "../../../swrs/common.swr";
import MiniButton from "../../common/mini-button";
import SliderItem from "../common/sliderItem";


interface IPositionAnimationProps extends Helper{
    position:Vector3;
}

export const PositionAnimationHelper=({position}:IPositionAnimationProps)=>{
    const {commonState}=useCommonSWR()
    const {animationState,onPosition,setPosition,setPositionSpeed}= useAnimationSWR()
    
    const [localPosition,setLocalPosition]=useState<Vector3>(new Vector3());
    const [localPositionSpeed,setLocalPositionSpeed]=useState<Vector3>(new Vector3())

    const setX=(e:number)=>{
        e = isNaN(e)?0:e;
        setLocalPosition(new Vector3(+e,localPosition.y,localPosition.z));
    }
    const setY=(e:number)=>{
        e = isNaN(e)?0:e;
        setLocalPosition(new Vector3(localPosition.x,+e,localPosition.z))
    }
    const setZ=(e:number)=>{
        e = isNaN(e)?0:e;
        setLocalPosition(new Vector3(localPosition.x,localPosition.y,e))
    }

    const setXSpeed=(e:number)=>{
        e = isNaN(e)?0:e;
        setLocalPositionSpeed(new Vector3(+e,localPositionSpeed.y,localPositionSpeed.z));
    }
    const setYSpeed=(e:number)=>{
        e = isNaN(e)?0:e;
        setLocalPositionSpeed(new Vector3(localPositionSpeed.x,+e,localPositionSpeed.z));
    }
    const setZSpeed=(e:number)=>{
        e = isNaN(e)?0:e;
        setLocalPositionSpeed(new Vector3(localPositionSpeed.x,localPositionSpeed.y,e));
    }

    const onClickEvent=()=>{
        onPosition(!animationState?.onPostion!)
        setPosition(localPosition)
        setPositionSpeed(localPositionSpeed)
    }

    return(
        <div className=" w-full p-2">
            <div>
                Position
            </div>
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={localPosition?.x}
            sliderChangeEvent={setX}
            inputChangeEvent={(e)=>setX(+e.target.value)}
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={localPosition?.y}
            sliderChangeEvent={setY}
            inputChangeEvent={(e)=>setY(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={localPosition?.z}
            sliderChangeEvent={setZ}
            inputChangeEvent={(e)=>setZ(+e.target.value)}
            />
            <div>
                Speed
            </div>
            <SliderItem
            label='x'
            max={10}
            min={-10}
            value={localPositionSpeed?.x}
            sliderChangeEvent={setXSpeed}
            inputChangeEvent={(e)=>setXSpeed(+e.target.value)}
            />
        <SliderItem
            label='y'
            max={10}
            min={-10}
            value={localPositionSpeed?.y}
            sliderChangeEvent={setYSpeed}
            inputChangeEvent={(e)=>setYSpeed(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={10}
            min={-10}
            value={localPositionSpeed?.z}
            sliderChangeEvent={setZSpeed}
            inputChangeEvent={(e)=>setZSpeed(+e.target.value)}
            />
            <div className="flex items-center justify-center">
                <MiniButton onClick={onClickEvent}>
                    {animationState?.onPostion?`stop`:`action`}
                </MiniButton>
                {/* <Button onClick={()=>{
                    onPosition(!animationState?.onPostion!)
                    setPosition(localPosition)
                    setPositionSpeed(localPositionSpeed)
                }}>{animationState?.onPostion?`stop`:`action`}</Button> */}
            </div>
        </div>
    )
}