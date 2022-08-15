import { Button, Col, Input, Row,Slider } from "antd"
// import {Slider as MobileSlider} from "antd-mobile"
import { useState, useEffect, ChangeEvent } from 'react';
import { Vector3 } from "three";
import { Helper } from "../../../global/interfaces/app.interface";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import SliderItem from "../common/sliderItem";

interface IScaleAnimationProps extends Helper{
    scale:Vector3;
}

export const ScaleAnimationHelper=({scale}:IScaleAnimationProps)=>{


    const {animationState,onScale,setScale,setScaleSpeed}=useAnimationSWR();
    const [localScale,setLocalScale]=useState<Vector3>(scale);
    const [localScaleSpeed,setLocalScaleSpeed]=useState<Vector3>(new Vector3());

    return(
        <div className="w-full p-2">
            <div>Position</div>
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={localScale?.x}
            sliderChangeEvent={
                (e:number)=>setLocalScale(new Vector3(+e,localScale.y,localScale.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalScale(new Vector3(+e.target.value,localScale.y,localScale.z))
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={localScale?.y}
            sliderChangeEvent={
                (e:number)=>setLocalScale(new Vector3(localScale.x,e,localScale.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalScale(new Vector3(localScale.x,+e.target.value,localScale.z))
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={localScale?.z}
            sliderChangeEvent={
                (e:number)=>setLocalScale(new Vector3(localScale.x,localScale.y,e))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalScale(new Vector3(localScale.x,localScale.y,+e.target.value))
            }
            />
            <div>Speed</div>
            <SliderItem
            label='x'
            max={10}
            min={-10}
            value={localScaleSpeed?.x}
            sliderChangeEvent={
                (e:number)=>setLocalScaleSpeed(new Vector3(e,localScaleSpeed.y,localScaleSpeed.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalScaleSpeed(new Vector3(+e.target.value,scale.y,scale.z))
            }
            />
            <SliderItem
            label='y'
            max={10}
            min={-10}
            value={localScaleSpeed?.y}
            sliderChangeEvent={
                (e:number)=>setLocalScaleSpeed(new Vector3(localScaleSpeed.x,e,localScaleSpeed.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalScaleSpeed(new Vector3(scale.x,+e.target.value,scale.z))
            }
            />
            <SliderItem
            label='z'
            max={10}
            min={-10}
            value={localScaleSpeed?.z}
            sliderChangeEvent={
                (e:number)=>setLocalScaleSpeed(new Vector3(localScaleSpeed.x,localScaleSpeed.y,e))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalScaleSpeed(new Vector3(scale.x,+e.target.value,scale.z))
            }
            />
            <Row>
                <Col>
                    <Button onClick={()=>{
                        onScale(!animationState?.onScale!)
                        setScale(localScale)
                        setScaleSpeed(localScaleSpeed)
                    }}>{animationState?.onScale?`stop`:`action`}</Button>
                </Col>
            </Row>
        </div>
    )
}