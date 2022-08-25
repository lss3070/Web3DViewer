import { EffectComposer, Outline } from "@react-three/postprocessing"
import { useEffect, useState, useLayoutEffect } from 'react';
import useIsomorphicLayoutEffect from "../hooks/useIsomorphicLayoutEffect";
import useMeshStore from "../store/mesh.store";
import { useTheme } from 'next-themes';


export const SelectMeshComponent=()=>{

    const {theme,setTheme}=useTheme()
    const [hoverMesh,selectMesh]=useMeshStore((state)=>[
        state.hoverMesh,
        state.selectMesh
    ])
    
    const [selectColor,setSelectColor]=useState<number>();
    const [hoverColor,setHoverColor]=useState<number>()

    useLayoutEffect(()=>{

        setHoverColor(theme==='dark'?0xffffff:0x0026ff)
        setSelectColor(theme==='dark'?0xffffff:0x0026ff)
    },[theme])
    
    return(
        <EffectComposer 
        autoClear={false} multisampling={1} >
            {/* hover outline mesh */}
        <Outline selection={hoverMesh!} 
            visibleEdgeColor={hoverColor} 
            hiddenEdgeColor={hoverColor} 
            blur={true} 
            edgeStrength={10} 
            selectionLayer={2}

            />
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