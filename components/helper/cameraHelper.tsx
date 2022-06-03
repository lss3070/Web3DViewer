import { Col, Collapse, Row, Slider } from "antd"
import { Box3, Vector3 } from "three";
import { useFrame } from '@react-three/fiber';
import { AutoZoomHelper } from "./camera/autoZoomHelper";
import { TargetMoveHelper } from "./camera/targetMoveHelper";
import { PositionMoveHelper } from "./camera/positionMoveHelper";
import { useCommonSWR } from "../../swrs/common.swr";
import { useCameraSWR } from "../../swrs/camera.swr";
import { useMeshSWR } from "../../swrs/mesh.swr";

export const CameraHelperComponent=()=>{

    const {commonState}=useCommonSWR();
    const {cameraState,setTarget,setPosition}=useCameraSWR();
    const {meshState}=useMeshSWR()
    
    const {Panel}=Collapse
    return(
        <Collapse>
            <Panel header="Camera" key="1">
                <Collapse defaultActiveKey="1">
                    <Panel header="AutoZoom" key="1">
                        <AutoZoomHelper/>
                    </Panel>
                </Collapse>
                <Collapse defaultActiveKey="2">
                    <Panel header="Position Move" key="1">
                        <PositionMoveHelper/>
                    </Panel>
                </Collapse>
                <Collapse>
                    <Panel header="Target Move" key="1">
                        <TargetMoveHelper/>
                    </Panel>
                </Collapse>
            </Panel>
        </Collapse>
    )
}