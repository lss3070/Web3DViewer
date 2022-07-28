import { useState } from "react";
import { useCommonSWR } from '../swrs/common.swr';
import FileTransForm from "../utils/fileTransform";

const FileDragArea=({children})=>{


    const {setFiltPath}=useCommonSWR()
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

        setFiltPath({
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
        className="w-full h-full grid fixed">
            {children}
        </div>
    )
}

export default FileDragArea