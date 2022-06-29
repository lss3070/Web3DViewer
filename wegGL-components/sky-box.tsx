import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import THREE, { BackSide, FrontSide, DoubleSide, DepthModes } from 'three';
import { useMeshSWR } from '../swrs/mesh.swr';

const SkyBox=()=>{
    const {meshState,setSelectMesh}=useMeshSWR()
    const initList =(e:any)=>{
        if(!meshState?.hoverMesh){
            setSelectMesh([]);
        }    
    }
    // const {gl} = useThree();
    // const texture = useTexture('')
    // const formatted = new THREE.WebGLCubeRenderTarget(1200).fromEquirectangularTexture(gl, texture)
   
    return(
        // <primitive attach='background'  object={formatted}/>
        // <texture attach={'background'}/>
        <mesh
        // attach={'background'}
        position={[0,0,0]}
        onClick={initList}
        onPointerUp={(e)=>console.log('down')}
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