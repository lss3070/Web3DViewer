import { useState } from "react"
import { Vector3 } from "three"
import { PositionAnimationHelper } from "../helper/animation/positionAniHelper"
import { RotationAnimationHelper } from "../helper/animation/rotationAniHelper"
import { ScaleAnimationHelper } from "../helper/animation/scaleAniHelper"
import RemocornTab from "./remocornTab"

const AnimationTab=()=>{
    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [scale,setScale]=useState<Vector3>(new Vector3());


    return(
        <RemocornTab >
            <PositionAnimationHelper label="Postion" position={position}/>
            <RotationAnimationHelper label="Rotation"/>
            <ScaleAnimationHelper label="Scale" scale={scale}/>
        </RemocornTab>
    )
}
export default AnimationTab