
import { useEffect,  useRef } from 'react';
import { ThreeEvent } from "@react-three/fiber";

import { MaterialElements } from "../utils/materialElements";
import useIsMobile from '../hooks/useIsMobile';
import useMeasureStore from "../store/measure.store";
import useMeshStore from "../store/mesh.store";
interface IMeshProps{
    mesh:THREE.Mesh
}

export function MeshComponent({mesh}:IMeshProps){
    

    const [onMeasure,setPoint]=useMeasureStore(state=>[
        state.onMeasure,
        state.setPoint]);

    const [
        onWire,
        setHoverMesh,
        setSelectMesh,
        setStaticMeshList
    ]= useMeshStore((state)=>[
        state.onWire,
        state.setHoverMesh,
        state.setSelectMesh,
        state.setStaticMeshList
    ])
    
    const isMobile = useIsMobile()

    const meshRef=useRef<any>();

    useEffect(()=>{
        setStaticMeshList(meshRef)
    },[meshRef])


    const meshOnClick =async (e: any)=>{ 
        if(!isMobile){
            onMeasure?
            setPoint(e.point):
            setSelectMesh(meshRef);
            
            e.stopPropagation()
        }
    }

    const hoverEvent=(e: ThreeEvent<PointerEvent>)=>{
        if(!isMobile){

            !onMeasure&&
            setHoverMesh(meshRef);

            e.stopPropagation();
        }
    }
    const onTouch=async(e:ThreeEvent<PointerEvent>)=>{
        if(isMobile){
            onMeasure?
            setPoint(e.point):
            setSelectMesh(meshRef);
            
            e.stopPropagation()
        }
    }
    
        return(
            <>
            <mesh ref={meshRef} 
            onPointerUp={onTouch}
            // onPointerOver={hoverEvent}

            onClick={meshOnClick}
            // onPointerDown={(e)=>{
            //     setSelectMesh([meshRef]);
            // }}
            
            // onPointerMove={hoverEvent}
           
            {...mesh}
            
            // type={mesh.type}
            // name={mesh.name}
            // uuid={mesh.uuid}
            // geometry={mesh.geometry}
            // scale={mesh.scale}
            // position={mesh.position}
            // quaternion={mesh.quaternion}
            >
                {MaterialElements(mesh.material,onWire)}
            </mesh>
                    {/* <MeshHtmlComponent 
                    centerPosition={mesh.geometry.boundingSphere?.center!}
                    visible={meshState?.onText!}
                    name={mesh.name}
                    uuid={mesh.uuid} 
                    /> */}
           
            </>
            
        )
};

//https://yomotsu.github.io/camera-controls/examples/basic.html