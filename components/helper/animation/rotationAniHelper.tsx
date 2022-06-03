import { Button, Col, Input, Row, Slider } from "antd"
// import {Slider as MobileSlider} from 'antd-mobile'
import { useState } from "react";
import { Vector3 } from "three";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import { useCommonSWR } from "../../../swrs/common.swr";

export const RotationAnimationHelper=()=>{

    const {commonState}=useCommonSWR();

    const {animationState,onRotation,setRotationSpeed}=useAnimationSWR();
    const [localRotationSpeed,setLocalRotationSpeed]=useState<Vector3>(new Vector3())
    
    return(
        <div className="w-80">
            <Row justify="center" align="middle">
                <Col span={4}>
                    x speed
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-10} max={10}
                        // step={0.01} value={localRotationSpeed.x}
                        // onChange={(e)=>setLocalRotationSpeed(new Vector3(+e,localRotationSpeed.y,localRotationSpeed.z))}
                        // />
                    ):
                    ( <Slider min={-10} max={10}
                    step={0.01} value={localRotationSpeed.x}
                    onChange={(e)=>setLocalRotationSpeed(new Vector3(e,localRotationSpeed.y,localRotationSpeed.z))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localRotationSpeed.x} onChange={(e)=>
                        setLocalRotationSpeed(new Vector3(+e.target.value,localRotationSpeed.y,localRotationSpeed.z))}/>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    y speed
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-10} max={10}
                        // step={0.01} value={localRotationSpeed.y}
                        // onChange={(e)=>setLocalRotationSpeed(new Vector3(localRotationSpeed.x,+e,localRotationSpeed.z))}
                        // />
                    ):
                    (<Slider min={-10} max={10}
                    step={0.01} value={localRotationSpeed.y}
                    onChange={(e)=>setLocalRotationSpeed(new Vector3(localRotationSpeed.x,e,localRotationSpeed.z))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localRotationSpeed.y} onChange={(e)=>
                        setLocalRotationSpeed(new Vector3(localRotationSpeed.x,+e.target.value,localRotationSpeed.z))}/>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    z speed
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-10} max={10}
                        // step={0.01} value={localRotationSpeed.z}
                        // onChange={(e)=>setLocalRotationSpeed(new Vector3(localRotationSpeed.x,localRotationSpeed.y,+e))}
                        // />
                    ):
                    (<Slider min={-10} max={10}
                    step={0.01} value={localRotationSpeed.z}
                    onChange={(e)=>setLocalRotationSpeed(new Vector3(localRotationSpeed.x,localRotationSpeed.y,e))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localRotationSpeed.z} onChange={(e)=>
                        setLocalRotationSpeed(new Vector3(localRotationSpeed.x,localRotationSpeed.y,+e.target.value))}/>
                </Col>
            </Row>
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