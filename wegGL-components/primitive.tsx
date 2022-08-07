import { Object3D } from 'three';
import SwitchObject from './switch-object';

interface IPrimitiveProps{
    object:Object3D<THREE.Event>
}

const PrimitiveComponent=({object}:IPrimitiveProps)=>{
    
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
export default PrimitiveComponent