import { Button, Col, Input, Row, Slider } from "antd"
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useState } from "react";
import { Vector3 } from "three";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import { useCommonSWR } from "../../../swrs/common.swr";
import SliderItem from "../../sliderItem";

export const RotationAnimationHelper=()=>{

    const {commonState}=useCommonSWR();

    const {animationState,onRotation,setRotationSpeed}=useAnimationSWR();
    const [localRotationSpeed,setLocalRotationSpeed]=useState<Vector3>(new Vector3())
    
    return(
        <div className="w-full">

        <div>Speed</div>
        <SliderItem
            label='x'
            max={10}
            min={-10}
            value={localRotationSpeed.x}
            sliderChangeEvent={
                (e:number)=>setLocalRotationSpeed(new Vector3(e,localRotationSpeed.y,localRotationSpeed.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalRotationSpeed(new Vector3(+e.target.value,localRotationSpeed.y,localRotationSpeed.z))
            }
            />
            <SliderItem
            label='y'
            max={10}
            min={-10}
            value={localRotationSpeed.y}
            sliderChangeEvent={
                (e:number)=>setLocalRotationSpeed(new Vector3(localRotationSpeed.x,e,localRotationSpeed.z))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalRotationSpeed(new Vector3(localRotationSpeed.x,+e.target.value,localRotationSpeed.z))
            }
            />
            <SliderItem
            label='z'
            max={10}
            min={-10}
            value={localRotationSpeed.z}
            sliderChangeEvent={
                (e:number)=>setLocalRotationSpeed(new Vector3(localRotationSpeed.x,localRotationSpeed.y,e))
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                setLocalRotationSpeed(new Vector3(localRotationSpeed.x,localRotationSpeed.y,+e.target.value))
            }
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