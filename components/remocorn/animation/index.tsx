import { useState } from "react"
import { Vector3 } from "three"
import CustomAniHelper from "./customAniHelper";
import { PositionAnimationHelper } from "./positionAniHelper";
import { RotationAnimationHelper } from "./rotationAniHelper";

import RemocornTab from "../common/remocornTab"

const AnimationTab=()=>{
    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [scale,setScale]=useState<Vector3>(new Vector3());


    return(
        <RemocornTab >
            <PositionAnimationHelper label="Postion" position={position}/>
            <RotationAnimationHelper label="Rotation"/>
            <CustomAniHelper label="Custom"/>
        </RemocornTab>
    )
}
export default AnimationTab