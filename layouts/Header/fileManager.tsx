

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useCommonSWR } from '../../swrs/common.swr';
import {AnimatePresence, motion} from 'framer-motion';
import Portal from '../../HOC/portal';
import ModalExport from '../../components/modal/modal-export';
import MiniButton from '../../components/common/mini-button';
import FileTransForm from '../../utils/file/fileTransform';
import useIsMobile from '../../hooks/useIsMobile';


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
    const {setFiltPath}=useCommonSWR();
    const [isExport,setIsExport]=useState<boolean>(false);


    const fileChange =(e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e.currentTarget.files);
        if(e.currentTarget.files?.length!<=0) return
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
        <>
            <div className="contents items-center justify-center">
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
            {
                !isMobile&&(
                    <MiniButton onClick={openExporter}>
                    <>
                        <FontAwesomeIcon
                            icon={['fas','upload']}
                            className="w-5 h-5"/>
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