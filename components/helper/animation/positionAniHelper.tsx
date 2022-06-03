import { Button, Col, Input, Row,Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile';
import { useState } from "react";
import { Vector3 } from "three";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import { useCommonSWR } from "../../../swrs/common.swr";


interface IPositionAnimationProps{
    position:Vector3;
}

export const PositionAnimationHelper=({position}:IPositionAnimationProps)=>{
    const {commonState}=useCommonSWR()
    const {animationState,onPosition,setPosition,setPositionSpeed}= useAnimationSWR()
    
    const [localPosition,setLocalPosition]=useState<Vector3>(new Vector3());
    const [localPositionSpeed,setLocalPositionSpeed]=useState<Vector3>(new Vector3())

    return(
        <div className=" w-80 p-2">
            <Row justify="center" align="middle">
                <Col span={4}>
                   x
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localPosition?.x}
                        // onChange={(e)=>{
                        //     setLocalPosition(new Vector3(+e,localPosition.y,localPosition.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localPosition?.x}
                    onChange={(e)=>{
                        setLocalPosition(new Vector3(+e,localPosition.y,localPosition.z))
                    }}
                    />)}

                </Col>
                <Col span={4}>
                    <Input value={localPosition.x} onChange={
                        (e)=>
                        setLocalPosition(new Vector3(+e.target.value,localPosition.y,localPosition.z))
                        }/>
                    {/* {localPosition?.x} */}
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={4}>
                    y
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localPosition?.y}
                        // onChange={(e)=>{
                        //     setLocalPosition(new Vector3(position.x,+e,position.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localPosition?.y}
                    onChange={(e)=>{
                        setLocalPosition(new Vector3(position.x,e,position.z))
                    }}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localPosition.y} onChange={(e)=>
                        setLocalPosition(new Vector3(localPosition.x,+e.target.value,localPosition.z))}/>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    z
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localPosition?.z}
                        // onChange={(e)=>{
                        //     setLocalPosition(new Vector3(position.x,position.y,+e))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localPosition?.z}
                    onChange={(e)=>{
                        setLocalPosition(new Vector3(position.x,position.y,e))
                    }}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localPosition.z} onChange={(e)=>
                        setLocalPosition(new Vector3(localPosition.x,localPosition.y,+e.target.value))}/>
                </Col>
            </Row>
            <Row>
                <Col span={4}>
                    x speed
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-10} max={10}
                        // step={0.01} value={localPositionSpeed.x}
                        // onChange={(e)=>setLocalPositionSpeed(new Vector3(+e,localPositionSpeed.y,localPositionSpeed.z))}
                        // />
                    ):
                    ( <Slider min={-10} max={10}
                    step={0.01} value={localPositionSpeed.x}
                    onChange={(e)=>setLocalPositionSpeed(new Vector3(e,localPositionSpeed.y,localPositionSpeed.z))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localPositionSpeed.x} onChange={(e)=>
                        setLocalPositionSpeed(new Vector3(+e.target.value,localPositionSpeed.y,localPositionSpeed.z))}/>
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
                        // step={0.01} value={localPositionSpeed.y}
                        // onChange={(e)=>setLocalPositionSpeed(new Vector3(localPositionSpeed.x,+e,localPositionSpeed.z))}
                        // />
                    ):
                    (<Slider min={-10} max={10}
                    step={0.01} value={localPositionSpeed.y}
                    onChange={(e)=>setLocalPositionSpeed(new Vector3(localPositionSpeed.x,e,localPositionSpeed.z))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localPositionSpeed.y} onChange={(e)=>
                        setLocalPositionSpeed(new Vector3(localPositionSpeed.x,+e.target.value,localPositionSpeed.z))}/>
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
                        // step={0.01} value={localPositionSpeed.z}
                        // onChange={(e)=>setLocalPositionSpeed(new Vector3(localPositionSpeed.x,localPositionSpeed.y,+e))}
                        // />
                    ):
                    (<Slider min={-10} max={10}
                    step={0.01} value={localPositionSpeed.z}
                    onChange={(e)=>setLocalPositionSpeed(new Vector3(localPositionSpeed.x,localPositionSpeed.y,e))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localPositionSpeed.z} onChange={(e)=>
                        setLocalPositionSpeed(new Vector3(localPositionSpeed.x,localPositionSpeed.y,+e.target.value))}/>    
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={()=>{
                        onPosition(!animationState?.onPostion!)
                        setPosition(localPosition)
                        setPositionSpeed(localPositionSpeed)
                    }}>{animationState?.onPostion?`stop`:`action`}</Button>
                </Col>
            </Row>
        </div>
    )
}