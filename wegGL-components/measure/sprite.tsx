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

    const target = loader.load("target.png");

    return(
        <>{
                points.map((item)=>{
                    return(
                        <sprite position={item}>
                            <spriteMaterial attach={'material'} map={target}
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