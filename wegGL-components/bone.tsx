import { Bone, Object3D } from 'three';
import SwitchObject from './switch-object';

interface IBoneProps{
    object:Object3D<THREE.Event>
}

const BoneComponent=({object}:IBoneProps)=>{
    
    return(
        //  <primitive object={object}/>
        /* {object&&
        (
            <SwitchObject object={object}/>
        )} */

        <primitive object={object}>
            {object.children&&(
                <SwitchObject objectList={object.children}/>
            )}
           
        </primitive>
    )
}
export default BoneComponent