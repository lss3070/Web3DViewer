import { Point, Points } from '@react-three/drei';
import { useState, useEffect, useMemo, useRef } from 'react';
import THREE, { BufferAttribute, BufferGeometry, Color, DynamicDrawUsage, Vector3 } from "three"
import { Geometry } from 'three-stdlib';
import { useMeasureSWR } from '../../swrs/measure.swr';
import { TextureLoader } from "three";


interface ISpriteProps{
    points:Vector3[]
}

const SpriteComponent=({points}:ISpriteProps)=>{

    // const [color,setColor] =useState<Color>(new THREE.Color('#000000'));
    const {measureState}=useMeasureSWR();

    const loader = new TextureLoader();

    const circle = new Path2D();
    circle.moveTo(125, 35);
    circle.arc(100, 35, 25, 0, 2 * Math.PI);


    const target = loader.load("target2.png");

    return(
        <>{
                points.map((item,index)=>{
                    return(
                        <sprite key={index} position={item} scale={0.01}>
                            <spriteMaterial attach={'material'} 
                            sizeAttenuation={false}    
                            map={target}
                            depthTest={false}
                            depthWrite={false}
                        
                            />
                        </sprite>
                    )
                })
        }
        </>
    )
}

export default SpriteComponent