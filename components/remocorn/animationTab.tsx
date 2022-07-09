import { useState } from "react"
import { Vector3 } from "three"
import { PositionAnimationHelper } from "../helper/animation/positionAniHelper"
import { RotationAnimationHelper } from "../helper/animation/rotationAniHelper"
import { ScaleAnimationHelper } from "../helper/animation/scaleAniHelper"
import RemocornTab, { IRemocornTabItem } from "./remocornTab"

const AnimationTab=()=>{
    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [scale,setScale]=useState<Vector3>(new Vector3());

    const tabList:IRemocornTabItem[]=[
        {
            label:'Position',
            index:0,
            content:<PositionAnimationHelper
            position={position}
            />
        },
        {
            label:'Rotate',
            index:1,
            content:<RotationAnimationHelper
            />
        },
        {
            label:'Scale',
            index:2,
            content:<ScaleAnimationHelper scale={scale}
            />
        },
    ]

    return(
        <RemocornTab tabList={tabList}/>
    )
}
export default AnimationTab