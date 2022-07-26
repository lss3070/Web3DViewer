import { ThreeEvent } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { SkinnedMesh } from "three"
import { useMeshSWR } from "../swrs/mesh.swr";
import { MaterialElements } from "../utils/materialElements"

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
        // if(e.metaKey||e.ctrlKey){
       
        //     const index= meshState?.selectMesh?.findIndex((mesh)=>mesh.current.uuid===skinnedMesh.current.uuid)!;
        //     if(index>=0){
        //         const meshList = [...meshState?.selectMesh!];
        //         meshList.splice(index,1)
        //         await setSelectMesh(meshList);
        //     }else{
               
        //         await setSelectMesh([...meshState?.selectMesh!,skinnedMesh])
        //     }
        // }else{
        //     console.log(skinnedMesh.current);
        //     setSelectMesh([skinnedMesh]);
        // }
    }
    // const meshDoubleClick=()=>{
    //     setSelectMeshBox(new Box3().setFromObject(meshRef.current))
    // }

    const hoverEvent=(e: ThreeEvent<PointerEvent>)=>{

        setHoverMesh(undefined);
        e.stopPropagation();

    }

    

    return(

    //     <skinnedMesh
    //     material={skinnedMeshItem.material}
    //     geometry={skinnedMeshItem.geometry}
    //     skeleton={skinnedMeshItem.skeleton}
    //   />

        <skinnedMesh 
        onPointerMove={hoverEvent}
        onPointerOver={hoverEvent}
   
        onClick={meshOnClick} ref={skinnedMesh} {...skinnedMeshItem}>
              {MaterialElements(skinnedMeshItem.material,meshState?.onWire!)}
        </skinnedMesh>
    )
}
export default SkinnedMeshComponent