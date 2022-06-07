import { useMemo, useState } from "react";
import { Euler, Mesh, Vector3 } from "three";
import { useCommonSWR } from "../../swrs/common.swr";
import { useMeshSWR } from "../../swrs/mesh.swr";
import Category, { TabCategoryProps } from "../category";
import { PositionHelper } from "../helper/action/positionHelper";
import { RotationHelper } from "../helper/action/rotationHelper";
import { ScaleHelper } from "../helper/action/scaleHelper";
import { VisibleHelper } from "../helper/action/visibleHelper";
import { PositionAnimationHelper } from "../helper/animation/positionAniHelper";
import { RotationAnimationHelper } from "../helper/animation/rotationAniHelper";
import { ScaleAnimationHelper } from "../helper/animation/scaleAniHelper";

interface ActionProps{
    openId?:number;
    setOpenId:Function;
}

const AnimationHelper=({openId,setOpenId}:ActionProps)=>{
    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [scale,setScale]=useState<Vector3>(new Vector3());

  const animationInfo:TabCategoryProps={
        label:'Anitmation',
        id:3,
        openId,
        setOpenId,
        tabList:[
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
    }
    
    return(
        <Category {...animationInfo}/>
    )
}

export default AnimationHelper;