import { Col, Row,Slider } from "antd";
import {Slider as MobileSlider} from 'antd-mobile'
import { useState } from "react";
import {Vector3} from 'three';
import { useCommonSWR } from "../../../swrs/common.swr";


interface IScaleProps{
    scale:Vector3;
    setScale:Function;
}

export const ScaleHelper=({scale,setScale}:IScaleProps)=>{
    const {commonState}=useCommonSWR()
    
    const [localScale,setLocalScale]=useState<Vector3>(scale);
    return(
        <div className="w-72">
            <Row align="middle" justify="center">
                <Col span={5}>
                   x
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={0} max={360}
                        // value={localScale?.x}
                        // onChange={(e)=>{
                        //     setScale(new Vector3(+e,localScale.y,localScale.z))
                        //     setLocalScale(new Vector3(+e,localScale.y,localScale.z))
                        // }}
                        // />
                    ):
                    (<Slider min={0} max={360}
                    value={localScale?.x}
                    onChange={(e)=>{
                        setScale(new Vector3(e,localScale.y,localScale.z))
                        setLocalScale(new Vector3(e,localScale.y,localScale.z))
                    }}
                    />)}

                </Col>
                <Col span={3}>
                    {localScale?.x}
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={5}>
                   y
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={0} max={360}
                        // value={localScale?.y}
                        // onChange={(e)=>{
                        //     setScale(new Vector3(localScale.x,+e,localScale.z))
                        //     setLocalScale(new Vector3(localScale.x,+e,localScale.z))
                        // }}
                        // />
                    ):
                    (<Slider min={0} max={360}
                    value={localScale?.y}
                    onChange={(e)=>{
                        setScale(new Vector3(localScale.x,e,localScale.z))
                        setLocalScale(new Vector3(localScale.x,e,localScale.z))
                    }}
                    />)}
                </Col>
                <Col span={3}>
                    {localScale?.y}
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={5}>
                   z
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={0} max={360}
                        // value={localScale?.z}
                        // onChange={(e)=>{
                        //     setScale(new Vector3(localScale.x,localScale.y,+e))
                        //     setLocalScale(new Vector3(localScale.x,localScale.y,+e))
                        // }}
                        // />
                    ):
                    (<Slider min={0} max={360}
                    value={localScale?.z}
                    onChange={(e)=>{
                        setScale(new Vector3(localScale.x,localScale.y,e))
                        setLocalScale(new Vector3(localScale.x,localScale.y,e))
                    }}
                    />)}
                </Col>
                <Col span={3}>
                    {localScale?.z}
                </Col>
            </Row>
        </div>
    )
}