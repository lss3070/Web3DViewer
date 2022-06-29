import { EffectComposer, Outline } from "@react-three/postprocessing"
import { useEffect, useState } from "react";
import { useMeshSWR } from "../swrs/mesh.swr";
import { useCommonSWR } from '../swrs/common.swr';


export const SelectMeshComponent=()=>{

    const {commonState}=useCommonSWR();
    const {meshState}=useMeshSWR();
    
    const [selectColor,setSelectColor]=useState<number>();
    const [hoverColor,setHoverColor]=useState<number>()

    useEffect(()=>{
        setHoverColor(commonState?.darkMode?0xffffff:0x000000)
        setSelectColor(commonState?.darkMode?0xffffff:0x000000)
    },[commonState?.darkMode])
    
    return(
        <EffectComposer 
        autoClear={false} multisampling={1} >
            {/* hover outline mesh */}
            <Outline selection={meshState?.hoverMesh!} 
            visibleEdgeColor={0xffffff} 
            hiddenEdgeColor={0xffffff} 
            blur={true} 
            edgeStrength={10} 
            selectionLayer={2}
            />
            {/* select outline mesh */}
            <Outline selection={meshState?.selectMesh!} 
            visibleEdgeColor={selectColor} 
            hiddenEdgeColor={selectColor}
            blur={true} 
            edgeStrength={100} 
             />
        </EffectComposer>
    )
}