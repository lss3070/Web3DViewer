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

        <bone {...object as Bone}>
            {object.children&&(
                <SwitchObject objectList={object.children}/>
            )}
           
        </bone>
    )
}
export default BoneComponent