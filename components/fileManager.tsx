

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useCommonSWR } from '../swrs/common.swr';
import {AnimatePresence, motion} from 'framer-motion';
import Portal from '../HOC/portal';
import ModalExport from '../HOC/modal-export';
import MiniButton from './mini-button';
import FileTransForm from '../utils/fileTransform';


const TypeList=['obj','gltf','stl','obj','glb','fbx'];

type ExportListProps={
    label:string
}
const ExportList =({label}:ExportListProps)=>{
    return(
        <motion.li 
        whileHover={{scale:1.2}}
        className=' mb-2 text-lg bg-gray-400 text-white
        cursor-pointer h-9 flex items-center justify-center
        '>
        {label}
        </motion.li>
    )
}


const FileManager=()=>{
    const {setFiltPath}=useCommonSWR();
    const [isExport,setIsExport]=useState<boolean>(false);


    const fileChange =(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.files?.length!<0) return
        const file= FileTransForm(e.currentTarget.files!)

        setFiltPath({
            originPath:file.originLink,
            originExtension:file.originExtension,
            originName:file.originName,
            fileMap:file.fileMap
        });
    }

    const closeExporter=()=>{
        setIsExport(false);
    }
    const openExporter=()=>{
        setIsExport(true);
    }

    return(
        <div className='flex gap-5 items-center'>
            <div className="flex items-center justify-center">
                <input className="w-0 h-0 opacity-0" type="file" name="file" id="file" 
                multiple
                onChange={fileChange}/>
                <MiniButton onClick={()=>{}} htmlFor="file">
                    <>
                        <FontAwesomeIcon
                        icon={['fas','download']}
                        className="w-5 h-5"/>
                        <span>
                            Open
                        </span>
                    </>
                </MiniButton>
            </div>
            <MiniButton onClick={openExporter}>
                <>
                    <FontAwesomeIcon
                        icon={['fas','upload']}
                        className="w-5 h-5"/>
                    <span>Save</span>
                </>
            </MiniButton>
           <Portal> 
                <AnimatePresence>
                    {isExport&&( <ModalExport onClose={closeExporter}/>)}
                </AnimatePresence>
           </Portal>
        </div>
    )
}

export default FileManager