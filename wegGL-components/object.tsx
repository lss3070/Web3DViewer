import { Group } from "three"
import SwitchObject from './switch-object';

interface IObjectComponentProps{
    group:Group
}

const ObjectComponent=({group}:IObjectComponentProps)=>{
    
    return(
        <group {...group}
        >
            {
                <SwitchObject object={group}/>
            }
        </group>
    )
}
export default ObjectComponent