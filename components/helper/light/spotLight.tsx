import { Button, Col, Collapse, Row, Slider } from "antd";
import { useLightSWR } from "../../../swrs/light.swr";

export const SpotLightHelper=()=>{
    
    
    const {lightState,

        setSpotAble,
        setSpotIntensity,
        setSpotAngle,
        setSpotPenumbra,
        setSpotPower,
        
        }=useLightSWR();
        const {Panel}=Collapse;
        
    return(
        <div className="w-72">
            <Row>
                <Col span={6}>
                    intensity  
                </Col>
                <Col span={12}>
                <Slider step={0.1} max={2} min={0} value={lightState?.spotLight.intensity} 
                    onChange={(e)=>{setSpotIntensity(e)}}/>
                </Col>
                <Col span={2}>
                    {lightState?.spotLight.intensity}
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    power
                </Col>
                <Col span={12}>
                    <Slider max={10000} min={0} value={lightState?.spotLight.power} 
                    onChange={(e)=>{setSpotPower(e)}}/>
                </Col>
                <Col span={2}>
                    {lightState?.spotLight.power}
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    angle
                </Col>
                <Col span={12}>
                    <Slider step={0.1} max={2} min={0} value={lightState?.spotLight.angle} 
                    onChange={(e)=>{setSpotAngle(e)}}/>
                </Col>
                <Col span={2}>
                    {lightState?.spotLight.angle}
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    penumbra
                </Col>
                <Col span={12}>
                    <Slider step={0.1} max={100} min={0} value={lightState?.spotLight.penumbra} 
                    onChange={(e)=>{setSpotPenumbra(e)}}/>
                </Col>
                <Col span={2}>
                    {lightState?.spotLight.penumbra}
                </Col>
            </Row>
            <Row>
                <Col span={6}>
                    able
                </Col>
                <Col span={12}>
                    <Button onClick={()=>{setSpotAble(!lightState?.spotLight.able)}}>
                        {lightState?.spotLight.able?'able':'disable'}
                    </Button>
                </Col>
            </Row>
        </div>

    )
}