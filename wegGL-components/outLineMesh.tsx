import { EffectComposer, Outline } from "@react-three/postprocessing"
import { useEffect, useState } from 'react';
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import useMeshStore, { useSelectMehsStore } from "../store/mesh.store";
import { useTheme } from 'next-themes';


export const SelectMeshComponent=()=>{

    const {theme,setTheme}=useTheme()

    const selectMesh=useSelectMehsStore((state)=>state.selectMesh)
    
    const [selectColor,setSelectColor]=useState<number>();
    const [hoverColor,setHoverColor]=useState<number>()

    useEffect(()=>{

        setHoverColor(theme==='dark'?0xffffff:0x0026ff)
        setSelectColor(theme==='dark'?0xffffff:0x0026ff)
    },[theme])
    
    return(
        <EffectComposer 
        stencilBuffer={true}
        autoClear={false} 
        multisampling={8}
         >
            {/* hover outline mesh */}
        {/* <Outline selection={hoverMesh!} 
            visibleEdgeColor={hoverColor} 
            hiddenEdgeColor={hoverColor} 
            blur={true} 
            edgeStrength={10} 
            selectionLayer={2}

            /> */}
            {/* select outline mesh */}
            <Outline selection={selectMesh!} 
            visibleEdgeColor={selectColor} 
            hiddenEdgeColor={selectColor}
            // blur={true} 
            edgeStrength={100} 

             />
        </EffectComposer>
    )
}