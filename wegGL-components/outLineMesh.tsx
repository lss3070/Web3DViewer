// import { EffectComposer, Outline } from "@react-three/postprocessing"
import { useEffect, useRef, useState } from 'react';
import useMeshStore, { useSelectMehsStore } from "../store/mesh.store";
import { useTheme } from 'next-themes';
// import { EffectComposer, OutlinePass, RenderPass } from 'three-stdlib';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, OutlinePass,RenderPass} from 'three-stdlib';
import { EffectComposer as PEffectComposer, Outline } from '@react-three/postprocessing';


export const SelectMeshComponent=()=>{

    const {theme,setTheme}=useTheme()
    const test =useRef<any>();

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
    const composer = useRef<EffectComposer>(null);
    const outlinePassRef = useRef<OutlinePass>(null);


    // useEffect(() => {
    //     composer.current!.setSize(size.width, size.height);
    //     composer.current!.setPixelRatio(gl.getPixelRatio());
    
    //     outlinePassRef.current!.visibleEdgeColor.set(0xffffff);
    //     outlinePassRef.current?.visibleEdgeColor.setRGB(255,255,255);
    //     outlinePassRef.current?.hiddenEdgeColor.setRGB(255,255,255)
    //     console.log(composer.current)
    //   }, [gl, size]);

      useFrame(()=>{
        // composer.current?.renderer.clear()
        // composer.current?.renderer.clearStencil()
        composer.current?.render(); 
      })
      useEffect(()=>{
          // if(selectMesh?.current){
          //   outlinePassRef.current!.selectedObjects = [selectMesh?.current!];
          //   console.log(outlinePassRef);
          // }else{
          //   outlinePassRef.current!.selectedObjects = [];
          // }
        
      },[selectMesh])
    

      useEffect(()=>{
        console.log(test);
      },[])

    extend({EffectComposer, OutlinePass,RenderPass})

    return(
      <PEffectComposer 
      ref={test}
      stencilBuffer={true}
      autoClear={false} 
      multisampling={8}
       >

          <Outline selection={selectMesh!} 
          visibleEdgeColor={selectColor} 
          hiddenEdgeColor={selectColor}
          // blur={true} 
          edgeStrength={100} 

           />
      </PEffectComposer>
        // <effectComposer  ref={composer} args={[gl]}>
        // <renderPass attach={'passes'}   args={[scene, camera]}/>
        // <outlinePass
        //     attach={'passes'}
        //  ref={outlinePassRef}
        //  args={[new Vector2(size.width, size.height), scene, camera]}
        // />
        // </effectComposer>
    )
}

//EffectComposer -> renderer-> autoClear
//EffectComposer -> render-> clearStencil (fn)