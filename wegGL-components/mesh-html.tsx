import { Html } from "@react-three/drei"
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Vector3 } from "three";


interface IMeshHtmlProps{
    centerPosition:Vector3
    name:string
    uuid:string
    visible:boolean
}

export const MeshHtmlComponent=({centerPosition,name,uuid,visible}:IMeshHtmlProps)=>{

    // mesh.geometry.computeBoundingSphere();
    

    const [selected,setSelected]= useState<boolean>(false);
    const [hovered,setHovered]=useState<boolean>(false);

    // useEffect(()=>{
    //     const index= meshState?.selectMesh?.findIndex((mesh)=>mesh.current.uuid===uuid)!;
    //     if(index>=0) setSelected(true);
    //     else setSelected(false);
    // },[meshState?.selectMesh, uuid]);

    // useEffect(()=>{
    //   setHovered(meshState?.hoverMesh?.current.uuid===uuid);
    // },[meshState?.hoverMesh, uuid]);

    const [inTextScale,setInTextScale]=useState<number>(10);

    return (
            // {meshPosition: centerPosition}&&{inScale: inTextScale}&&
            <Html 
            style={{'display':visible?`block`:'none'}}
            className={`
            select-none
            ${selected?'text-red-400':hovered?'text-orange-300':`text-black`}
            `}
            // center={true}
            // fullscreen={true}
            // prepend={true}
            // occlude
            sprite
            transform
            distanceFactor={inTextScale}
            position={centerPosition}>
                {name}
            </Html>
        )
}


