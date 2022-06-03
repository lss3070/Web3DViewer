import { Button, Col, Collapse, Row, Slider } from "antd"
import { useState } from "react";
import { useLightSWR } from "../../../swrs/light.swr";

export const PointLightHelper=()=>{

    const {lightState,
        setPointAble,
        setPointPosition,
        setPointPower,
        setPointIntensity
    }=useLightSWR();
    const {Panel}=Collapse;
    const [colorPicker,setColorPicker]=useState<boolean>(false);
    
    return(
        <div  className="w-72">
            <Row>
                <Col span={6}>
                intensity
                </Col>
                <Col span={12}>
                    <Slider step={0.1} max={10} min={0} value={lightState?.pointLight.intensity} 
                    onChange={(e)=>{setPointIntensity(e)}}/>
                </Col>
                <Col span={2}>
                    {lightState?.pointLight.intensity}
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    power
                </Col>
                <Col span={12}>
                    <Slider max={1000} min={0} value={lightState?.pointLight.power}
                    onChange={(e)=>{setPointPower(e)}}/>
                </Col>
                <Col>
                    {lightState?.pointLight.power}
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    able
                </Col>
                <Col span={10}>
                    <Button onClick={()=>{setPointAble(!lightState?.pointLight.able)}}>
                        {lightState?.pointLight.able?'able':'disable'}
                    </Button>
                </Col>
            </Row>
        </div>

    )
}