import { useEffect, useState } from 'react';
import { Bone, Object3D } from 'three';
import SwitchObject from './switch-object';

interface IPrimitiveProps{
    object:Object3D<THREE.Event>
}

function PrimitiveComponent({object}:IPrimitiveProps){
    const [children,setChildren]=useState<THREE.Object3D<THREE.Event>[]>()

    useEffect(()=>{
        setChildren(object.children)
        object.children=[]
    },[object])
    // const ee= object as Bone
    return(
         <primitive key={object.uuid} object={object}>
            {children&&(
                <SwitchObject objectList={children}/>
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