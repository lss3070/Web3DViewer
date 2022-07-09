import { PositionMoveHelper } from "../helper/camera/positionMoveHelper";
import { TargetMoveHelper } from "../helper/camera/targetMoveHelper";
import RemocornTab, { IRemocornTabItem } from "./remocornTab";

const CameraTab=()=>{
    
    const tabList:IRemocornTabItem[]=[
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
    return(
       <RemocornTab tabList={tabList}/>
    )
}
export default CameraTab;