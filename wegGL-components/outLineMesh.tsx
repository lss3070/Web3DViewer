import { EffectComposer, Outline } from "@react-three/postprocessing"
import { useEffect } from "react";
import { useMeshSWR } from "../swrs/mesh.swr";


export const SelectMeshComponent=()=>{

    const {meshState}=useMeshSWR();
    
    return(
        <EffectComposer autoClear={false} multisampling={1} >
            {/* hover outline mesh */}
            <Outline selection={meshState?.hoverMesh!} 
            visibleEdgeColor={100} 
            hiddenEdgeColor={100} 
            blur={true} 
            edgeStrength={10} 
            selectionLayer={2}
            />
            {/* select outline mesh */}
            <Outline selection={meshState?.selectMesh!} 
            visibleEdgeColor={200} 
            hiddenEdgeColor={200}
            blur={true} 
            edgeStrength={100} 
             />
        </EffectComposer>
    )
}