import { useTexture } from '@react-three/drei';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { useState } from 'react';
import THREE, { BackSide, FrontSide, DoubleSide, DepthModes } from 'three';
import useIsMobile from '../hooks/useIsMobile';
import useMeshStore from '../store/mesh.store';

const SkyBox=()=>{

    const [setInitSelectMesh,setHoverMesh]=useMeshStore((state)=>[
        state.setInitSelectMesh,
        state.setHoverMesh
    ])
    const isMobile =useIsMobile()
    const {scene}= useThree()

    const initList =(e:any)=>{
        e.delta<=1&&setInitSelectMesh();
    }
    const hoverEvent=(e: ThreeEvent<PointerEvent>)=>{

        setHoverMesh(undefined);
        e.stopPropagation();
    }
    const onTouch=(e:ThreeEvent<PointerEvent>)=>{
        isMobile&&e.delta<=1&&setInitSelectMesh();
        
    }
    // const {gl} = useThree();
    // const texture = useTexture('')
    // const formatted = new THREE.WebGLCubeRenderTarget(1200).fromEquirectangularTexture(gl, texture)
   
    return(
        // <primitive attach='background'  object={formatted}/>
        // <texture attach={'background'}/>
        <mesh
        name="skybox"
        onPointerUp={onTouch}
        onPointerMove={hoverEvent}
        onPointerOver={hoverEvent}
        // attach={'background'}
        position={[0,0,0]}
        onClick={initList}
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