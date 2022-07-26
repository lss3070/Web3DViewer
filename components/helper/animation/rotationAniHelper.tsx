import { Button, Col, Input, Row, Slider } from "antd"
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useState } from "react";
import { Vector3 } from "three";
import { Helper } from "../../../interfaces/app.interface";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";

interface RoationProps extends Helper{
    
}

export const RotationAnimationHelper=({}:RoationProps)=>{

    const {commonState}=useCommonSWR();

    const {animationState,onRotation,setRotationSpeed}=useAnimationSWR();
    const [localRotationSpeed,setLocalRotationSpeed]=useState<Vector3>(new Vector3())
    
    const setXSpeed=(e:number)=>{
        e = isNaN(e)?0:e;
        setRotationSpeed(new Vector3(+e,localRotationSpeed.y,localRotationSpeed.z));
    }
    const setYSpeed=(e:number)=>{
        e = isNaN(e)?0:e;
        setRotationSpeed(new Vector3(localRotationSpeed.x,+e,localRotationSpeed.z));
    }
    const setZSpeed=(e:number)=>{
        e = isNaN(e)?0:e;
        setRotationSpeed(new Vector3(localRotationSpeed.x,localRotationSpeed.y,e));
    }

    return(
        <div className="w-full">

        <div>Speed</div>
        <SliderItem
            label='x'
            max={10}
            min={-10}
            value={localRotationSpeed.x}
            sliderChangeEvent={setXSpeed}
            inputChangeEvent={(e)=>setXSpeed(+e.target.value)}
            />
            <SliderItem
            label='y'
            max={10}
            min={-10}
            value={localRotationSpeed.y}
            sliderChangeEvent={setYSpeed}
            inputChangeEvent={(e)=>setXSpeed(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={10}
            min={-10}
            value={localRotationSpeed.z}
            sliderChangeEvent={setZSpeed}
            inputChangeEvent={(e)=>setZSpeed(+e.target.value)}
            />
            <Row>
                <Col>
                    <Button onClick={()=>{
                        onRotation(!animationState?.onRotation!)
                        setRotationSpeed(localRotationSpeed)
                    }}>{animationState?.onPostion?`stop`:`action`}</Button>
                </Col>
            </Row>
        </div>
    )
}