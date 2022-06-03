import { Col, Row, Slider } from "antd"
// import {Slider as MobileSlider} from 'antd-mobile'
import { useMemo, useState } from "react";
import { Vector3 } from "three";
import { useCommonSWR } from "../../../swrs/common.swr";

interface IPositionHelper{
    position:Vector3;
    setPosition:Function;
}

export const PositionHelper=({position,setPosition}:IPositionHelper)=>{
    const {commonState}=useCommonSWR()
    
    const [localPosition,setLocalPosition]=useState<Vector3>(position);//only View
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
                        // value={localPosition?.x}
                        // onChange={(e)=>{
                        //     setPosition(new Vector3(+e,position.y,position.z))
                        //     setLocalPosition(new Vector3(+e,position.y,position.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localPosition?.x}
                    onChange={(e)=>{
                        setPosition(new Vector3(e,position.y,position.z))
                        setLocalPosition(new Vector3(e,position.y,position.z))
                    }}
                    />)}

                </Col>
                <Col span={3}>
                    {localPosition?.x}
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
                        // value={localPosition?.y}
                        // onChange={(e)=>{
                        //     setPosition(new Vector3(position.x,+e,position.z))
                        //     setLocalPosition(new Vector3(position.x,+e,position.z))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localPosition?.y}
                    onChange={(e)=>{
                        setPosition(new Vector3(position.x,e,position.z))
                        setLocalPosition(new Vector3(position.x,e,position.z))
                    }}
                    />)}
                </Col>
                <Col span={3}>
                    {localPosition?.y}
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={5}>
                   z
                </Col>
                <Col span={16}>
                    {commonState?.onMobile?(
                        <></>
                        // <MobileSlider min={-1000} max={1000}
                        // value={localPosition?.z}
                        // onChange={(e)=>{
                        //     setPosition(new Vector3(position.x,position.y,+e))
                        //     setLocalPosition(new Vector3(position.x,position.y,+e))
                        // }}
                        // />
                    ):
                    (<Slider min={-1000} max={1000}
                    value={localPosition?.z}
                    onChange={(e)=>{
                        setPosition(new Vector3(position.x,position.y,e))
                        setLocalPosition(new Vector3(position.x,position.y,e))
                    }}
                    />)}
                </Col>
                <Col span={3}>
                    {localPosition?.z}
                </Col>
            </Row>
        </div>
    )
}