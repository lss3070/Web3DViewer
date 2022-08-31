import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { SkinnedMesh } from "three"
import useIsMobile from "../hooks/useIsMobile";
import useMeasureStore from "../store/measure.store";
import useMeshStore from "../store/mesh.store";
import { MaterialElements } from "../utils/materialElements"

interface ISkinnedMeshProps{
    skinnedMeshItem:SkinnedMesh
}

function SkinnedMeshComponent({skinnedMeshItem}:ISkinnedMeshProps){

    const [
        onMeasure,
        setPoint
    ]=useMeasureStore(state=>[
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
    
    const skinnedMesh=useRef<any>()
    useEffect(()=>{
        setStaticMeshList(skinnedMesh)
    },[skinnedMesh])

    const meshOnClick =async (e:any)=>{ 
        if(!isMobile){
            onMeasure?
            setPoint(e.point):
            setSelectMesh(skinnedMesh);
            
            e.stopPropagation()
        }
    }

    const hoverEvent=(e: ThreeEvent<PointerEvent>)=>{

        setHoverMesh(undefined);
        e.stopPropagation();

    }
    const onTouch=async(e:ThreeEvent<PointerEvent>)=>{
        if(isMobile){
            onMeasure?
            setPoint(e.point):
            setSelectMesh(skinnedMesh);
            
            e.stopPropagation()
        }
    }
    
    return(
            <>
                <skinnedMesh 
                    onPointerMove={hoverEvent}
                    onPointerOver={hoverEvent}
                    onPointerUp={onTouch}
            
                    onClick={meshOnClick} ref={skinnedMesh} 
                    
                    {...skinnedMeshItem}
                    >
                        {MaterialElements(skinnedMeshItem.material,onWire)}
                </skinnedMesh>
                    {/* <MeshHtmlComponent 
                                centerPosition={skinnedMeshItem.geometry.boundingSphere?.center!}
                                visible={meshState?.onText!}
                                name={skinnedMeshItem.name}
                                uuid={skinnedMeshItem.uuid} 
                                /> */}
            </>

    )
}
export default SkinnedMeshComponent