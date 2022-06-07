import { Button, Col, Collapse, Row, Slider } from "antd"
import {Vector3} from 'three';
import { useState } from 'react';
import { useFrame } from "@react-three/fiber";
import {useSpring,animated} from '@react-spring/three';
import { PositionAnimationHelper } from "./animation/positionAniHelper";
import { RotationAnimationHelper } from './animation/rotationAniHelper';
import { ScaleAnimationHelper } from './animation/scaleAniHelper';
import { useCommonSWR } from "../../swrs/common.swr";
import { useMeshSWR } from "../../swrs/mesh.swr";

export const AnimationHelperComponent=()=>{
    const {Panel}=Collapse

    // const [onPosition,setOnposition]=useState<boolean>(false);
    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [scale,setScale]=useState<Vector3>(new Vector3());

    return(
        <Collapse>
            <Panel header="Animation" key="1">
                <Collapse>
                    <Panel header="Position" key="1">
                        <PositionAnimationHelper position={position}/>
                    </Panel>
                </Collapse>
                <Collapse>
                    <Panel header="Rotation" key="1">
                        <RotationAnimationHelper/>
                    </Panel>
                </Collapse>
                <Collapse>
                    <Panel header="Scale" key="1">
                        <ScaleAnimationHelper scale={scale}/>
                    </Panel>
                </Collapse>
            </Panel>
        </Collapse>
    )
}