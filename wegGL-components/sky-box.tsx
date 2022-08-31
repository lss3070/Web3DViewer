import { useTexture } from '@react-three/drei';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { useState } from 'react';
import THREE, { BackSide, FrontSide, DoubleSide, DepthModes } from 'three';
import useIsMobile from '../hooks/useIsMobile';
import useMeshStore, { useSelectMehsStore } from '../store/mesh.store';

const SkyBox=()=>{

    const setInitSelectMesh=useSelectMehsStore((state)=>state.setInitSelectMesh)

    const isMobile =useIsMobile()
    const {scene}= useThree()

    const initList =(e:any)=>{
        e.delta<=1&&setInitSelectMesh();
    }
    const hoverEvent=(e: ThreeEvent<PointerEvent>)=>{
        e.stopPropagation();
    }
    const onTouch=(e:ThreeEvent<PointerEvent>)=>{
        isMobile&&e.delta<=1&&setInitSelectMesh();
        
    }
   
    return(
        // <primitive attach='background'  object={formatted}/>
        // <texture attach={'background'}/>
        <mesh
        name="skybox"
        onPointerUp={onTouch}
        onClick={initList}
        // onPointerMove={hoverEvent}
        // onPointerOver={hoverEvent}
        // attach={'background'}
        position={[0,0,0]}
       
        renderOrder={10}
        >
            <boxGeometry args={[10000, 10000, 10000]}/>
            <meshStandardMaterial color={'orange'}
            // depthTest={false}
            // depthWrite={false}
            side={BackSide}
            visible={false}
            />
        </mesh>
    )
}
export default SkyBox