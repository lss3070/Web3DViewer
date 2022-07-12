import InfoHelper from "../helper2/infoHelper"
import RemocornTab from "./remocornTab"

const InfoTab=()=>{

    const tabList=[
        {
            label:'Info',
            index:0,
            content:<InfoHelper
            />
        },
    ]
    return(
        <RemocornTab tabList={tabList}/>
    )
}

export default InfoTab