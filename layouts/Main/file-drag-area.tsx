import { useState } from "react";
import useFileStore from "../../store/file.store";
import FileTransForm from "../../utils/file/fileTransform";

const FileDragArea=({children})=>{


    const setFileInfo = useFileStore((state)=>state.setFileInfo)
    const [onFileDrag,setOnFileDrag]=useState<boolean>(false);
    
    const onDragEnter=(e: React.DragEvent<HTMLDivElement>)=>{
        if(e.dataTransfer.items.length>0){
            setOnFileDrag(true);
            e.stopPropagation()
            e.preventDefault();
          }
    }
    const onDrop=(e: React.DragEvent<HTMLDivElement>)=>{
        const file= FileTransForm(e.dataTransfer.files)

        setFileInfo({
            originPath:file.originLink,
            originExtension:file.originExtension,
            originName:file.originName,
            fileMap:file.fileMap
        });
        e.stopPropagation()
        e.preventDefault()
    }
    const onDragOver=(e: React.DragEvent<HTMLDivElement>)=>{
        if(onFileDrag){
            e.stopPropagation()
            e.preventDefault()
          }
    }
    const onDragLeave=(e: React.DragEvent<HTMLDivElement>)=>{
        if(onFileDrag){
            e.stopPropagation();
            e.preventDefault();
            setOnFileDrag(false);
          }
    }

    return(
        <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        className="w-full h-full fixed">
            {children}
        </div>
    )
}

export default FileDragArea