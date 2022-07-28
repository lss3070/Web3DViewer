
import { PositionMoveHelper } from "./positionMoveHelper";
import { TargetMoveHelper } from "./targetMoveHelper";
import RemocornTab from "../common/remocornTab";

const CameraTab=()=>{
    
    return(
       <RemocornTab>
           <PositionMoveHelper label="Position"/>
           <TargetMoveHelper label="Target"/>
        </RemocornTab>
    )
}
export default CameraTab;