import { motion } from "framer-motion"
import {OBJExporter} from 'three/examples/jsm/exporters/OBJExporter';
import {PLYExporter, PLYExporterOptions} from 'three/examples/jsm/exporters/PLYExporter';
import {STLExporter} from 'three/examples/jsm/exporters/STLExporter';
import {GLTFExporter} from 'three/examples/jsm/exporters/GLTFExporter';
import {ColladaExporter} from 'three/examples/jsm/exporters/ColladaExporter';
import {DRACOExporter} from 'three/examples/jsm/exporters/DRACOExporter';
import {EXRExporter} from 'three/examples/jsm/exporters/EXRExporter';
import {KTX2Exporter} from 'three/examples/jsm/exporters/KTX2Exporter';
import {MMDExporter} from 'three/examples/jsm/exporters/MMDExporter';
import {USDZExporter} from 'three/examples/jsm/exporters/USDZExporter';

import { useCommonSWR } from '../swrs/common.swr';
import { useState } from "react";
// import { Object3D } from "three";
// import { useMeshSWR } from '../swrs/mesh.swr';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

enum ExportType{
    OBJ,
    PLY,
    STL,
    GLTF
}

interface IExportProps{
    onClose:()=>void;
}

const Export =({onClose}:IExportProps)=>{

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
            top:'-10%',
            // height:0,
        }
    }

    const saveString =(text:string,extension:string)=>{
        const link = document.createElement('a');
        const blob = new Blob([text])
        link.href=URL.createObjectURL(blob);
        link.download=commonState?.fileName!+extension;
        link.click();
        link.remove();
    }

    const onSave=(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
       
        const objectData= commonState?.scene?.current?.getObjectByProperty('uuid',
        commonState.fileUuid!)
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
                    console.log(res);
                    // saveString(res,'.gltf')
                },(error)=>{
                    console.log(error);
                })
                break
        }
        onClose();
    }
    const onSelectChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        console.log('change');
        console.log(commonState?.scene?.current?.children);
        setSelect(+e.target.value as ExportType)
    }
    return(
        <motion.div 
        className={` text-white px-4
        absolute
        left-[50%]
        translate-x-[-50%]
        translate-y-[-50%]
        rounded-md
        overflow-hidden
        grid
        gap-1
        z-[99]
        bg-[#64758b]
        p-3
        `}
        animate={'down'}
        variants={variants}
        exit={'up'}
        onClick={(e)=>e.stopPropagation()}
        >
            <div className="flex text-lg">
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
                <select className="text-white 
                 w-full
                 rounded-md
                bg-transparent 
                border 
                border-[#bdbdbd]" 
                value={select} 
                onChange={onSelectChange}>
                    <option value={ExportType.OBJ}>Wavefront(obj)</option>
                    <option value={ExportType.PLY}>ply</option>
                    <option value={ExportType.STL}>stl</option>
                    <option value={ExportType.GLTF}>gltf</option>
                </select>
            </div>
            <div className='flex justify-end items-center gap-2 '>
                <div className='border rounded-md p-1 cursor-pointer' 
                onClick={onSave}
                >Save</div>
                <div className='border rounded-md p-1 cursor-pointer'
                onClick={onClose}
                >
                    Cancel
                </div>
            </div>
        </motion.div>
    )
}

export default Export