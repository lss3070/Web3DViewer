import { EffectComposer, Outline } from "@react-three/postprocessing"
import { useEffect, useState } from "react";
import { useMeshSWR } from "../swrs/mesh.swr";
import useDarkStore from '../store/dark.store';


export const SelectMeshComponent=()=>{

    const darkMode = useDarkStore((state)=>state.darkMode)
    const {meshState}=useMeshSWR();
    
    const [selectColor,setSelectColor]=useState<number>();
    const [hoverColor,setHoverColor]=useState<number>()

    useEffect(()=>{
        setHoverColor(darkMode?0xffffff:0x0026ff)
        setSelectColor(darkMode?0xffffff:0x0026ff)
    },[darkMode])
    
    return(
        <EffectComposer 
        autoClear={false} multisampling={1} >
            {/* hover outline mesh */}
            <Outline selection={meshState?.hoverMesh!} 
            visibleEdgeColor={hoverColor} 
            hiddenEdgeColor={hoverColor} 
            blur={true} 
            edgeStrength={10} 
            selectionLayer={2}

            />
            {/* select outline mesh */}
            <Outline selection={meshState?.selectMesh!} 
            visibleEdgeColor={selectColor} 
            hiddenEdgeColor={selectColor}
            // blur={true} 
            edgeStrength={100} 

             />
        </EffectComposer>
    )
}