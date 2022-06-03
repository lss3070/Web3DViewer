import { Button, Col, Input, Row,Slider } from "antd"
// import {Slider as MobileSlider} from "antd-mobile"
import { useState, useEffect } from 'react';
import { Vector3 } from "three";
import { useAnimationSWR } from "../../../swrs/animation.swr";
import { useCommonSWR } from "../../../swrs/common.swr";

interface IScaleAnimationProps{
    scale:Vector3;
}

export const ScaleAnimationHelper=({scale}:IScaleAnimationProps)=>{

    const {commonState,}=useCommonSWR();

    const {animationState,onScale,setScale,setScaleSpeed}=useAnimationSWR();
    const [localScale,setLocalScale]=useState<Vector3>(scale);
    const [localScaleSpeed,setLocalScaleSpeed]=useState<Vector3>(new Vector3());

    return(
        <div className="w-80 p-2">
            <Row align="middle" justify="center">
                <Col span={4}>
                   x
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localScale?.x}
                        // onChange={(e)=>{
                        //     setLocalScale(new Vector3(+e,localScale.y,localScale.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localScale?.x}
                    onChange={(e)=>{
                        setLocalScale(new Vector3(+e,localScale.y,localScale.z))
                    }}
                    />)}

                </Col>
                <Col span={4}>
                    <Input value={localScale.x} onChange={
                        (e)=>
                            setLocalScale(new Vector3(+e.target.value,localScale.y,localScale.z))
                        }/>
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
                        // value={localScale?.y}
                        // onChange={(e)=>{
                        //     setLocalScale(new Vector3(localScale.x,+e,localScale.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localScale?.y}
                    onChange={(e)=>{
                        setLocalScale(new Vector3(localScale.x,e,localScale.z))
                    }}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localScale.y} onChange={
                        (e)=>
                        setLocalScale(new Vector3(localScale.x,+e.target.value,localScale.z))
                        }/>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={4}>
                    z
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localScale?.z}
                        // onChange={(e)=>{
                        //     setLocalScale(new Vector3(localScale.x,localScale.y,+e))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localScale?.z}
                    onChange={(e)=>{
                        setLocalScale(new Vector3(localScale.x,localScale.y,e))
                    }}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localScale.z} onChange={
                        (e)=>
                        setLocalScale(new Vector3(localScale.x,localScale.y,+e.target.value))
                        }/>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={4}>
                    x speed
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-10} max={10}
                        // step={0.01} value={localScaleSpeed.x}
                        // onChange={(e)=>setLocalScaleSpeed(new Vector3(+e,localScaleSpeed.y,localScaleSpeed.z))}
                        // />
                    ):
                    ( <Slider min={-10} max={10}
                    step={0.01} value={localScaleSpeed.x}
                    onChange={(e)=>setLocalScaleSpeed(new Vector3(e,localScaleSpeed.y,localScaleSpeed.z))}
                    />)}
                </Col>
                <Col span={4}>                    
                    <Input value={localScaleSpeed.x} onChange={
                        (e)=>
                        setLocalScale(new Vector3(+e.target.value,scale.y,scale.z))
                        }/></Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={4}>
                    y speed
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-10} max={10}
                        // step={0.01} value={localScaleSpeed.y}
                        // onChange={(e)=>setLocalScaleSpeed(new Vector3(localScaleSpeed.x,+e,localScaleSpeed.z))}
                        // />
                    ):
                    (<Slider min={-10} max={10}
                    step={0.01} value={localScaleSpeed.y}
                    onChange={(e)=>setLocalScaleSpeed(new Vector3(localScaleSpeed.x,e,localScaleSpeed.z))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localScaleSpeed.y} onChange={
                        (e)=>
                        setLocalScale(new Vector3(scale.x,+e.target.value,scale.z))
                        }/>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={4}>
                    z speed
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-10} max={10}
                        // step={0.01} value={localScaleSpeed.z}
                        // onChange={(e)=>setLocalScaleSpeed(new Vector3(localScaleSpeed.x,localScaleSpeed.y,+e))}
                        // />
                    ):
                    (<Slider min={-10} max={10}
                    step={0.01} value={localScaleSpeed.z}
                    onChange={(e)=>setLocalScaleSpeed(new Vector3(localScaleSpeed.x,localScaleSpeed.y,e))}
                    />)}
                </Col>
                <Col span={4}>
                    <Input value={localScaleSpeed.z} onChange={
                        (e)=>
                        setLocalScale(new Vector3(scale.x,+e.target.value,scale.z))
                        }/>
                </Col>
            </Row>
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