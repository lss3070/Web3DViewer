import { Html } from "@react-three/drei"
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Vector3 } from "three";
import { useMeshSWR } from "../swrs/mesh.swr";
import { useCommonSWR } from '../swrs/common.swr';


interface IMeshHtmlProps{
    centerPosition:Vector3
    name:string
    uuid:string
}

export const MeshHtmlComponent=({centerPosition,name,uuid}:IMeshHtmlProps)=>{

    // mesh.geometry.computeBoundingSphere();
    const { meshState,setMeshTextScale }= useMeshSWR();
    const {commonState}= useCommonSWR()

    const [selected,setSelected]= useState<boolean>(false);
    const [hovered,setHovered]=useState<boolean>(false);

    useEffect(()=>{
        const index= meshState?.selectMesh?.findIndex((mesh)=>mesh.current.uuid===uuid)!;
        if(index>=0) setSelected(true);
        else setSelected(false);
    },[meshState?.selectMesh, uuid]);

    useEffect(()=>{
      setHovered(meshState?.hoverMesh?.current.uuid===uuid);
    },[meshState?.hoverMesh, uuid]);

    const [inTextScale,setInTextScale]=useState<number>(10);

    return (
            {meshPosition: centerPosition}&&{inScale: inTextScale}&&
            <Html 
            pointerEvents="none"
            className={selected?'text-red-400':hovered?'text-orange-300':
            commonState?.darkMode?`text-white`:`text-black`}
            sprite
            transform
            distanceFactor={inTextScale}
            position={centerPosition}>
                {name}
            </Html>
        )
}


