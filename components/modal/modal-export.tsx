import { AnimatePresence, motion } from "framer-motion"
import DarkBackGround from "./dark-background"
import {OBJExporter} from 'three/examples/jsm/exporters/OBJExporter';
import {PLYExporter, PLYExporterOptions} from 'three/examples/jsm/exporters/PLYExporter';
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter';
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter';
import { useCommonSWR } from "../../swrs/common.swr";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MiniButton from "../common/mini-button";

enum ExportType{
    OBJ,
    PLY,
    STL,
    GLTF
}

interface IExportProps{
    onClose:()=>void;
}

const ModalExport=({onClose}:IExportProps)=>{
    const {commonState}=useCommonSWR()
    const [select,setSelect]=useState<ExportType>(ExportType.OBJ)

    const objExporter = new OBJExporter()
    const plyExporter = new PLYExporter()
    const gltfExporter = new GLTFExporter()
    const stlExporter = new STLExporter()

    const variants={
        down:{
            // height:'auto',
            top:'30%',
            // rotate: [0, -30, 0], 
            transition: { duration: 0.5 }
        },
        up:{
            top:'-20%',
            // height:0,
        }
    }

    const saveString =(text:string,extension:string)=>{
        const link = document.createElement('a');
        const blob = new Blob([text])
        link.href=URL.createObjectURL(blob);
        link.download=commonState?.fileInfo!+extension;
        link.click();
        link.remove();
    }

    const onSave=()=>{
       
        const objectData= commonState?.scene?.current?.getObjectByProperty('uuid',
        commonState.fileUuid!);
        
        switch(select){
            
            case ExportType.OBJ:
                const objData= objExporter.parse(objectData!);
                saveString(objData,'.obj');
            break
            case ExportType.PLY:
                const options:PLYExporterOptions={}
                plyExporter.parse(objectData!,(res)=>{
                    saveString(res,'.ply');
                },options);
                break
            case ExportType.STL:
                const stlData= stlExporter.parse(objectData!);
                saveString(stlData,'.stl');
                break
            case ExportType.GLTF:
                gltfExporter.parse(objectData!,(res)=>{
                  
                    saveString(res.slice(''),'.gltf')
                },(error)=>{
                    console.log(error);
                })
                break
        }
        onClose();
    }
    const onSelectChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
     
        setSelect(+e.target.value as ExportType)
    }

    return(
            <DarkBackGround onClick={onClose}>
                <motion.div
                style={{gap:'10px',padding:'10px 10px',left:'50%'}} 
                className={`
                absolute
                translate-x-[-50%]
                rounded-md
                overflow-hidden
                grid
                z-[99]
                border 
                border-red-100
                text-gray-600
                bg-[#f7fafb]
                dark:text-white
                dark:bg-[#4b5766]
                dark:border-transparent
                shadow-2xl
                gap-3
                `}
                animate={'down'}
                variants={variants}
                exit={'up'}
                onClick={(e)=>e.stopPropagation()}
                >
                    <div className="flex text-lg font-bold">
                        <div>
                            <FontAwesomeIcon
                                    icon={['fas','upload']}
                                    className="w-5 h-5"/>
                        </div>
                        <div>Save</div>
                    </div>
                    <div>
                        Please set the format you want to save
                    </div>
                    <div>
                        <select className="
                        text-gray-600
                        outline-none
                        border-none
                        w-full
                        rounded-md
                        dark:text-gray-600
                        dark:bg-white
                        border 
                        border-[#bdbdbd]" 
                        value={select} 
                        onChange={onSelectChange}>
                            <option value={ExportType.OBJ}>obj</option>
                            <option value={ExportType.PLY}>ply</option>
                            <option value={ExportType.STL}>stl</option>
                            <option value={ExportType.GLTF}>gltf</option>
                        </select>
                    </div>
                    <div className='flex justify-end items-center gap-5'>
                        <MiniButton onClick={onSave}>
                            Save
                        </MiniButton>
                        <MiniButton onClick={onClose}>
                            Cancel
                        </MiniButton>
                    </div>
                </motion.div>    
            </DarkBackGround>
    )
}
export default ModalExport;