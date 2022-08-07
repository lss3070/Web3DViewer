import { Object3D } from "three"
import SwitchObject from "./switch-object"

interface IObjectProps{
    object:Object3D<THREE.Event>
}

const ObjectComponent=({object}:IObjectProps)=>{
    return(
        <object3D {...object}>
              {object.children&&(
                <SwitchObject objectList={object.children}/>
            )}
        </object3D>
    )
}

export default ObjectComponent