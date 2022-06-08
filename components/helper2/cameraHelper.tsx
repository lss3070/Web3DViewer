import Category, { TabCategoryProps } from "../category";
import { PositionMoveHelper } from "../helper/camera/positionMoveHelper";
import { TargetMoveHelper } from "../helper/camera/targetMoveHelper";

interface CameraProps{
    openId?:number;
    setOpenId:Function;
}

export const CameraHelper=({openId,setOpenId}:CameraProps)=>{

    const cameraInfo:TabCategoryProps={
        label:'Camera',
        id:0,
        openId,
        setOpenId,
        tabList:[
            {
                label:'Position',
                index:0,
                content:<PositionMoveHelper/>
            },
            {
                label:'Target',
                index:1,
                content:<TargetMoveHelper/>
            },
        ]
    }
    return(
        <Category {...cameraInfo}/>
    )
}
