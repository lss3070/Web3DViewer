import { Col, Row, Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile'
import { useState } from "react";
import { Euler, Vector3 } from "three";
import { useCommonSWR } from "../../../swrs/common.swr";


interface IRotationHelper{
    rotation:Euler;
    setRotation:Function;
}


export const RotationHelper=({rotation,setRotation}:IRotationHelper)=>{
    const {commonState}=useCommonSWR()
    
    const [localRotation,setLocalRotation]=useState<Euler>(rotation);

    return(
        <div className="w-72">
            <Row align="middle" justify="center">
                <Col span={5}>
                   x
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localRotation?.x}
                        // onChange={(e)=>{
                        //     setRotation(new Euler(+e,localRotation.y,localRotation.z))
                        //     setLocalRotation(new Euler(+e,localRotation.y,localRotation.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localRotation?.x}
                    onChange={(e)=>{
                        setRotation(new Euler(e,localRotation.y,localRotation.z))
                        setLocalRotation(new Euler(e,localRotation.y,localRotation.z))
                    }}
                    />)}

                </Col>
                <Col span={3}>
                    {localRotation?.x}
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={5}>
                   y
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localRotation?.y}
                        // onChange={(e)=>{
                        //     setRotation(new Euler(localRotation.x,+e,localRotation.z))
                        //     setLocalRotation(new Euler(localRotation.x,+e,localRotation.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localRotation?.y}
                    onChange={(e)=>{
                        setRotation(new Euler(localRotation.x,e,localRotation.z))
                        setLocalRotation(new Euler(localRotation.x,e,localRotation.z))
                    }}
                    />)}
                </Col>
                <Col span={3}>
                    {localRotation?.y}
                </Col>
            </Row>
            <Row>
                <Col span={5}>
                   z
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localRotation?.z}
                        // onChange={(e)=>{
                        //     setRotation(new Euler(localRotation.x,localRotation.y,+e))
                        //     setLocalRotation(new Euler(localRotation.x,localRotation.y,+e))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localRotation?.z}
                    onChange={(e)=>{
                        setRotation(new Euler(localRotation.x,localRotation.y,e))
                        setLocalRotation(new Euler(localRotation.x,localRotation.y,e))
                    }}
                    />)}
                </Col>
                <Col span={3}>
                    {localRotation?.z}
                </Col>
            </Row>
        </div>
    )
}