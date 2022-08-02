import { useState } from "react";
import THREE, { Color } from "three"
import { useMeasureSWR } from '../swrs/measure.swr';

const Point=()=>{

    const [color,setColor] =useState<Color>(new THREE.Color('#000000'));
    const {measureState}=useMeasureSWR();


    return(
        <points>
        <bufferGeometry attach="geometry">
            <bufferAttribute
            // attachObject={['attributes', 'position']}
            // count={vertices.length / 3}
            // this renders the dots fine
            // array={new Float32Array(vertices)}
            // but I can't get the interpolated values to work
            // might be because bufferAttribute must accept a typed array?
            // array={new Float32Array(factor)}
            itemSize={3}
            // onUpdate={self => {
            //     self.needsUpdate = true
            //     self.verticesNeedUpdate = true
            // }}
            />
            <pointsMaterial 
            sizeAttenuation attach="material" 
            color={color} 
            depthWrite={false} 
            size={10} />
        </bufferGeometry>
    </points>
    )

 
}

export default Point