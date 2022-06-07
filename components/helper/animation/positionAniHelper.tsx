import { Button, Col, Input, Row,Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile';
import { ChangeEvent, useState } from "react";
import { Vector3 } from "three";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";


interface IPositionAnimationProps{
    position:Vector3;
}

export const PositionAnimationHelper=({position}:IPositionAnimationProps)=>{
    const {commonState}=useCommonSWR()
    const {animationState,onPosition,setPosition,setPositionSpeed}= useAnimationSWR()
    
    const [localPosition,setLocalPosition]=useState<Vector3>(new Vector3());
    const [localPositionSpeed,setLocalPositionSpeed]=useState<Vector3>(new Vector3())

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
            sliderChangeEvent={
                (e:number)=>setLocalPosition(new Vector3(+e,localPosition.y,localPosition.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalPosition(new Vector3(+e.target.value,localPosition.y,localPosition.z))
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={localPosition?.y}
            sliderChangeEvent={
                (e:number)=>setLocalPosition(new Vector3(localPosition.x,+e,localPosition.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalPosition(new Vector3(localPosition.x,+e.target.value,localPosition.z))
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={localPosition?.z}
            sliderChangeEvent={
                (e:number)=>setLocalPosition(new Vector3(localPosition.x,localPosition.y,e))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalPosition(new Vector3(localPosition.x,localPosition.y,+e.target.value))
            }
            />
            <div>
                Speed
            </div>
            <SliderItem
            label='x'
            max={10}
            min={-10}
            value={localPositionSpeed?.x}
            sliderChangeEvent={
                (e:number)=>setLocalPositionSpeed(new Vector3(e,localPositionSpeed.y,localPositionSpeed.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalPositionSpeed(new Vector3(+e.target.value,localPosition.y,localPosition.z))
            }
            />
        <SliderItem
            label='y'
            max={10}
            min={-10}
            value={localPositionSpeed?.y}
            sliderChangeEvent={
                (e:number)=>setLocalPositionSpeed(new Vector3(localPositionSpeed.x,e,localPositionSpeed.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalPositionSpeed(new Vector3(localPosition.x,+e.target.value,localPosition.z))
            }
            />
            <SliderItem
            label='z'
            max={10}
            min={-10}
            value={localPositionSpeed?.z}
            sliderChangeEvent={
                (e:number)=>setLocalPositionSpeed(new Vector3(localPositionSpeed.x,localPositionSpeed.y,e))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalPositionSpeed(new Vector3(localPosition.x,localPosition.y,+e.target.value))
            }
            />
            <div className="flex items-center justify-center">
                <Button onClick={()=>{
                    onPosition(!animationState?.onPostion!)
                    setPosition(localPosition)
                    setPositionSpeed(localPositionSpeed)
                }}>{animationState?.onPostion?`stop`:`action`}</Button>
            </div>
        </div>
    )
}