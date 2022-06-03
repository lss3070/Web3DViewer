import { useCommonSWR } from "../swrs/common.swr";
import { ActionHelperComponent } from "./helper/actionHelper"
import { AmbientLightHelper } from "./helper/light/ambientLight"




interface IMobileHepler{
    children?:React.ReactNode
}
export const MobileHelperControl=()=>{

    const {commonState}=useCommonSWR();

    return(
    <div className="absolute right-4 bottom-4 border w-auto h-auto">
        {commonState?.mobileHelperComponent!}
        {/* <AmbientLightHelper /> */}
    </div>
    )
}