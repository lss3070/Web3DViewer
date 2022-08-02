import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { SkinnedMesh } from "three"
import { useMeshSWR } from "../swrs/mesh.swr";
import { MaterialElements } from "../utils/materialElements"
import { MeshHtmlComponent } from "./mesh-html";

interface ISkinnedMeshProps{
    skinnedMeshItem:SkinnedMesh
}

const SkinnedMeshComponent=({skinnedMeshItem}:ISkinnedMeshProps)=>{
    const { meshState,setHoverMesh,setSelectMesh,setStaticMeshList }= useMeshSWR();
    
    const skinnedMesh=useRef<any>()
    useEffect(()=>{
        setStaticMeshList(skinnedMesh)
    },[skinnedMesh])

    const meshOnClick =async (e:any)=>{ 
        setSelectMesh(skinnedMesh);

        e.stopPropagation()
    }

    const hoverEvent=(e: ThreeEvent<PointerEvent>)=>{

        setHoverMesh(undefined);
        e.stopPropagation();

    }

    

    return(



            <>

                <skinnedMesh 
                    onPointerMove={hoverEvent}
                    onPointerOver={hoverEvent}
            
                    onClick={meshOnClick} ref={skinnedMesh} {...skinnedMeshItem}>
                        {MaterialElements(skinnedMeshItem.material,meshState?.onWire!)}
                </skinnedMesh>
                    <MeshHtmlComponent 
                                centerPosition={skinnedMeshItem.geometry.boundingSphere?.center!}
                                visible={meshState?.onText!}
                                name={skinnedMeshItem.name}
                                uuid={skinnedMeshItem.uuid} 
                                />
            </>

    )
}
export default SkinnedMeshComponent