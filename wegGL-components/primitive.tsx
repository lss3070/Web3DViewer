import { Bone, Object3D } from 'three';
import SwitchObject from './switch-object';

interface IPrimitiveProps{
    object:Object3D<THREE.Event>
}

const PrimitiveComponent=({object}:IPrimitiveProps)=>{
    
  
    // const ee= object as Bone
    return(


     
         <primitive object={object}>
            {object.children&&(
                <SwitchObject objectList={object.children}/>
            )}
           
        </primitive>
     
        //  <primitive object={object}/>
        /* {object&&
        (
            <SwitchObject object={object}/>
        )} */

       
    )
}
export default PrimitiveComponent