import { Points } from '@react-three/drei';
import { useState, useEffect, useMemo, useRef } from 'react';
import THREE, { BufferAttribute, BufferGeometry, Color } from "three"
import { Geometry } from 'three-stdlib';
import { useMeasureSWR } from '../swrs/measure.swr';



const Point=()=>{

    // const [color,setColor] =useState<Color>(new THREE.Color('#000000'));
    const {measureState}=useMeasureSWR();

    const [point,setPoint] = useState<BufferAttribute>()

    const points = useMemo(()=>{
        if(measureState?.point?.length!>0){
            const buffer = new BufferAttribute(new Float32Array(measureState?.point!),3)
            return buffer
        }else{
            return new BufferAttribute(new Float32Array([0,0,0]),3)
        }
    },[measureState?.point])


    
    useEffect(()=>{
       const buffer= new BufferAttribute(new Float32Array(measureState?.point!),3)
        setPoint(buffer);
    },[measureState?.point]);

    return(
        <>{
            measureState?.point?.length!>0&&<points>
            <shapeBufferGeometry attach={"geometry"} name="geometry">
                <bufferAttribute
                   attach={"position"} 
                //    {...points}
                    array={new Float32Array(measureState?.point!)}
                    itemSize={3}
                   needsUpdate={true}
                   />
                </shapeBufferGeometry>
                <pointsMaterial 
                sizeAttenuation={true}
                color={0xff00ff} 
                size={0.1} />
        </points>
        }
           
        </>
     
    )
}

export default Point