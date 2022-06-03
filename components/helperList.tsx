import { Collapse, Col,Row,Slider, InputNumber } from "antd"
import { Box3, Vector3 } from "three";
import { CameraHelperComponent } from "./helper/cameraHelper";
import { LightHelperComponent } from "./helper/lightHelper";
import { ActionHelperComponent } from "./helper/actionHelper";
import { AnimationHelperComponent } from "./helper/animationHelper";
import { CommonHelperComponent } from "./helper/commonHelper";

interface IHelperComponent{
    visible:boolean
}

export const HelperListComponent=({visible}:IHelperComponent)=>{
    const { Panel } = Collapse;

    return(
    <div className={`h-full ${visible?`col-span-2 block`:`hidden`} overflow-y-auto`}>
        <CommonHelperComponent/>
        <CameraHelperComponent/>
        <LightHelperComponent/>
        <ActionHelperComponent/>
        <AnimationHelperComponent/>
    </div>
    )
}