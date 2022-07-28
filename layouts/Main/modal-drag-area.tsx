import { ChangeEvent, useEffect, useRef } from "react";
import { useCommonSWR } from "../../swrs/common.swr";
import { useMenuSWR } from "../../swrs/menu.swr";

interface IDragAndDropAreaProps{
    children:JSX.Element|JSX.Element[];
}
const TypeList=['obj','gltf','stl','obj','glb','fbx'];

const DragAndDropArea=({children}:IDragAndDropAreaProps)=>{

    const { setDragArea} =useMenuSWR();
    const {setFiltPath}=useCommonSWR();

    const dragArea = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        setDragArea(dragArea);
      },[dragArea])    

    return(
        <div ref={dragArea} className={`absolute top-[5%] left-0  w-full h-[95%]`}>
            {children}
        </div>
    )
}

export default DragAndDropArea