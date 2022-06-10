import { TabCategoryProps } from "../category";
import { AmbientLightHelper } from "../helper/light/ambientLight";
import { PointLightHelper } from "../helper/light/pointLightHelper";
import { SpotLightHelper } from "../helper/light/spotLight";

const LightHelper=(openId:any,setOpenId:any)=>{

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
        <div></div>
    )
}
export default LightHelper;