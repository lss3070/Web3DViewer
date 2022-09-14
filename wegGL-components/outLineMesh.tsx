// import { EffectComposer, Outline } from "@react-three/postprocessing"
import { useEffect, useRef, useState } from 'react';
import useMeshStore, { useSelectMehsStore } from "../store/mesh.store";
import { useTheme } from 'next-themes';
import {EffectComposer,OutlinePass} from 'three-stdlib'
import { useThree } from '@react-three/fiber';


export const SelectMeshComponent=()=>{

    const {theme,setTheme}=useTheme()

    const selectMesh=useSelectMehsStore((state)=>state.selectMesh)
    
    const [selectColor,setSelectColor]=useState<number>();
    const [hoverColor,setHoverColor]=useState<number>()

    useEffect(()=>{

        setHoverColor(theme==='dark'?0xffffff:0x0026ff)
        setSelectColor(theme==='dark'?0xffffff:0x0026ff)
    },[theme])

    const gl = useThree(({ gl }) => gl);
    const size = useThree(({ size }) => size);
    const scene = useThree(({ scene }) => scene);
    const camera = useThree(({ camera }) => camera);
    const composer = useRef<EffectComposer>();
    const outlinePassRef = useRef<OutlinePass>();
    

    // extend({EffectComposer, OutlinePass})

    return(
        <effectComposer  args={[gl]}>
        <renderPass  args={[scene, camera]}/>
        <outlinePass/>
        {/* <outlinePass/> */}
           {/* select outline mesh */}
         {/* <Outline selection={selectMesh!} 
         visibleEdgeColor={selectColor} 
         hiddenEdgeColor={selectColor}
        blur={true} 
    edgeStrength={100} /> */}
    </effectComposer>
    )
}