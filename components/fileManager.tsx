

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useCommonSWR } from '../swrs/common.swr';
import {AnimatePresence, motion} from 'framer-motion';
import Portal from '../HOC/portal';
import ModalExport from '../HOC/modal-export';
import MiniButton from './mini-button';


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

    const [openHover,setOpenHover]=useState<boolean>(false);
    const [isExport,setIsExport]=useState<boolean>(false);


    const fileChange =(e:ChangeEvent<HTMLInputElement>)=>{


        const files= e.currentTarget.files;
       
        const fileMap = new Map<string,File>();

        let originExtension:string;
        let originName:string;
        let originLink:string;
        let supportLink:string;

        
        for(let i=0;i<files?.length!;i++){
            const file = files?.item(i)!;
            fileMap.set(file.name,file)
            const commaIndex = file?.name?.lastIndexOf('.')

            const name = file.name.slice(0,commaIndex)
            const extension = file?.name?.slice( commaIndex+1,file.name.length);
            const link = window.URL.createObjectURL(file);

            console.log(extension);
            if(TypeList.indexOf(extension)>=0){
                console.log(extension);
                originExtension=extension;
                originName=name;
                originLink=link;
            }
        }
        // setFIleName(originName!);
        // setFileExtension(originExtension!);
        setFiltPath({
            originPath:originLink!,
            originExtension:originExtension!,
            originName:originName!,
            fileMap:fileMap!
        });

        // const file = e.currentTarget.files![0];
        // if(file){
        //     const commaIndex = file?.name?.lastIndexOf('.')
        //     const fileName = file.name.slice(0,commaIndex)
        //     const extension = file?.name?.slice( commaIndex+1,file.name.length);
        //     const link = window.URL.createObjectURL(file);

        //     setFIleName(fileName);
        //     setFileExtension(extension);
        //     setFiltPath(link);
        // }
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