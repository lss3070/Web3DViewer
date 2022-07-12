import { PositionMoveHelper } from "../helper/camera/positionMoveHelper";
import { TargetMoveHelper } from "../helper/camera/targetMoveHelper";
import RemocornTab from "./remocornTab";

const CameraTab=()=>{
    
    return(
       <RemocornTab>
           <PositionMoveHelper label="Position"/>
           <TargetMoveHelper label="Target"/>
        </RemocornTab>
    )
}
export default CameraTab;