
import { motion, LayoutGroup,AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Category, { TabCategoryProps } from './category';
import { AutoZoomHelper } from './helper/camera/autoZoomHelper';
import { AmbientLightHelper } from './helper/light/ambientLight';
import { PointLightHelper } from './helper/light/pointLightHelper';
import { SpotLightHelper } from './helper/light/spotLight';
import { PositionHelper } from './helper/action/positionHelper';
import { PositionMoveHelper } from './helper/camera/positionMoveHelper';
import { TargetMoveHelper } from './helper/camera/targetMoveHelper';
import { RotationHelper } from './helper/action/rotationHelper';
import { ScaleHelper } from './helper/action/scaleHelper';
import { VisibleHelper } from './helper/action/visibleHelper';
import ActionHelper from './helper2/actionHelper';
import AnimationHelper from './helper2/animationHelper';
import CommonHelper from './helper2/commonHelper';
import { CameraHelper } from './helper2/cameraHelper';


const CustomLayout =()=>{

    const [openId,setOpenId]=useState<number>();

    const cameraInfo:TabCategoryProps={
        label:'Camera',
        id:0,
        openId,
        setOpenId,
        tabList:[
            {
                label:'AutoZoom',
                index:0,
                content:<AutoZoomHelper/>
            },
            {
                label:'PointLight',
                index:1,
                content:<PositionMoveHelper/>
            },
            {
                label:'SpotLight',
                index:2,
                content:<TargetMoveHelper/>
            }
        ]
    }

    const lightInfo:TabCategoryProps={
        label:'Light',
        id:1,
        openId,
        setOpenId,
        tabList:[
            {
                label:'AmbientLight',
                index:0,
                content:<AmbientLightHelper/>
            },
            {
                label:'PointLight',
                index:1,
                content:<PointLightHelper/>
            },
            {
                label:'SpotLight',
                index:2,
                content:<SpotLightHelper/>
            }
        ]
    }

    return(
    <div className="rounded-md border p-4
     absolute top-1/4 right-10 w-72 h-auto
     grid gap-5 bg-slate-500
    ">
                    {/* common */}
                    <CommonHelper openId={openId} setOpenId={setOpenId}/>
                    {/* camera */}
                    <CameraHelper openId={openId} setOpenId={setOpenId}/>
                    {/* light */}
                    <Category {...lightInfo}/>
                    {/* action */}
                    <ActionHelper openId={openId} setOpenId={setOpenId}/>
                    {/* animation */}
                    <AnimationHelper openId={openId} setOpenId={setOpenId}/>
       
    </div>)
}
export default CustomLayout;