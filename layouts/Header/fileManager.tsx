

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Portal from '../../HOC/portal';
import ModalExport from '../../components/modal/modal-export';
import MiniButton from '../../components/common/mini-button';
import FileTransForm from '../../utils/file/fileTransform';
import useIsMobile from '../../hooks/useIsMobile';
import useFileStore from '../../store/file.store';
import {faDownload,faUpload} from '@fortawesome/free-solid-svg-icons'


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
    const isMobile = useIsMobile()
    const setFileInfo = useFileStore((state)=>state.setFileInfo)
    const [isExport,setIsExport]=useState<boolean>(false);


    const fileChange =(e:ChangeEvent<HTMLInputElement>)=>{
        if(e.currentTarget.files?.length!<=0) return
        const file= FileTransForm(e.currentTarget.files!)

        setFileInfo({
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
        <>
            <div className="contents items-center justify-center">
                <input className="w-0 h-0 opacity-0" type="file" name="file" 
                id="file"
                accept='.fbx, .obj, .gltf, .glb, .stl, .ply, .wasm, .js, .jpg, .jpeg, .png, .bin, .mtl'
                multiple
                onChange={fileChange}/>
                <MiniButton onClick={()=>{}} htmlFor="file">
                    <>
                        <FontAwesomeIcon
                        icon={faDownload}
                        size="lg"
                        className='mr-1'
                        />
                        <span>
                            Open
                        </span>
                    </>
                </MiniButton>
            </div>
            {
                !isMobile&&(
                    <MiniButton onClick={openExporter}>
                    <>
                        <FontAwesomeIcon
                            icon={faUpload}
                            size="lg"
                            className='mr-1'
                            />
                        <span>Save</span>
                    </>
                </MiniButton>
                )
            }
           <Portal> 
                <AnimatePresence>
                    {isExport&&( <ModalExport onClose={closeExporter}/>)}
                </AnimatePresence>
           </Portal>
        </>
    )
}

export default FileManager