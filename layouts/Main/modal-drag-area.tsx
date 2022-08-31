import { ChangeEvent, useEffect, useRef } from "react";
import useMenuStore from "../../store/menu.store";

interface IDragAndDropAreaProps{
    children:JSX.Element|JSX.Element[];
}
const TypeList=['obj','gltf','stl','obj','glb','fbx'];

const DragAndDropArea=({children}:IDragAndDropAreaProps)=>{


    const setDragArea =useMenuStore((state)=>state.setDragArea)

    const dragArea = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        setDragArea(dragArea!)
      },[dragArea])    

    return(
        <div ref={dragArea} className={`absolute left-0  w-full h-[95%] border border-red-600`}>
            {children}
        </div>
    )
}

export default DragAndDropArea