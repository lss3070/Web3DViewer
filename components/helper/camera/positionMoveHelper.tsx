import { Col, Row, Slider } from "antd"
import { Vector3 } from "three";
import { useCameraSWR } from "../../../swrs/camera.swr";

export const PositionMoveHelper=()=>{
    const {cameraState,setPosition}=useCameraSWR();
    const PositionMoveEvent=(x:number,y:number,z:number)=>{
        setPosition(new Vector3(x,y,z));
    }
    return(
        <div className="w-72">
            <Row align="middle">
                <Col span={5}>
                    x
                </Col>
                <Col span={16}>
                    <Slider min={-1000} max={1000}
                    value={cameraState?.position.x}
                    onChange={(e)=>PositionMoveEvent(e,cameraState?.position.y!,cameraState?.position.z!)}
                    />
                </Col>
                <Col span={3}>
                    {cameraState?.position.x}
                </Col>
            </Row>
            <Row align="middle">
                <Col span={5}>
                    y
                </Col>
                <Col  span={16}>
                    <Slider min={-1000} max={1000}
                    value={cameraState?.position.y}
                    onChange={(e)=>PositionMoveEvent(cameraState?.position.x!,e,cameraState?.position.z!)}
                    />
                </Col>
                <Col span={3}>
                    {cameraState?.position.y}
                </Col>
            </Row>
            <Row align="middle">
                <Col span={5}>
                    z
                </Col>
                <Col  span={16}>
                    <Slider min={-1000} max={1000}
                    value={cameraState?.position.z}
                    onChange={(e)=>PositionMoveEvent(cameraState?.position.x!,cameraState?.position.y!,e)}
                    />
                </Col>
                <Col span={3}>
                    {cameraState?.position.z}
                </Col>
            </Row>
        </div>
    )
}