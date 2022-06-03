import { Col, Row, Slider } from "antd"
import { Vector3 } from "three";
import { useCameraSWR } from "../../../swrs/camera.swr";

export const TargetMoveHelper=()=>{
    const {cameraState,setTarget}=useCameraSWR();
    
    const TargetChangeEvent=(x:number,y:number,z:number)=>{
        setTarget(new Vector3(x,y,z));
    } 
    return(
        <div className="w-72">
            <Row align="middle" justify="center">
                <Col span={5}>
                    x
                </Col>
                <Col span={16}>
                    <Slider min={-1000} max={1000}
                    value={cameraState?.target!.x}
                    onChange={(e)=>TargetChangeEvent(e,cameraState?.target!.y!,cameraState?.target!.z!)}
                    />
                </Col>
                <Col span={3}>
                    {cameraState?.target!.x}
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={5}>
                    y
                </Col>
                <Col  span={16}>
                    <Slider min={-1000} max={1000}
                    value={cameraState?.target!.y}
                    onChange={(e)=>TargetChangeEvent(cameraState?.target!.x!,e,cameraState?.target!.z!)}
                    />
                </Col>
                <Col span={3}>
                    {cameraState?.target!.y}
                </Col>
            </Row>
            <Row>
                <Col span={5}>
                    z
                </Col>
                <Col span={16}>
                    <Slider min={-1000} max={1000}
                    value={cameraState?.target!.z}
                    onChange={(e)=>TargetChangeEvent(cameraState?.target!.x!,cameraState?.target!.y!,e)}
                    />
                </Col>
                <Col span={3}>
                    {cameraState?.target!.z}
                </Col>
            </Row>
        </div>
    )
}