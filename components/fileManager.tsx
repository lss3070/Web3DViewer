

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useCommonSWR } from '../swrs/common.swr';
import {AnimatePresence, motion} from 'framer-motion';
import Export from './Export';

type Position ={
    x:number;
    y:number;
}

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
    const {setFiltPath,setFileExtension,setFIleName}=useCommonSWR();

    const [openHover,setOpenHover]=useState<boolean>(false);
    const [isExport,setIsExport]=useState<boolean>(false);

    const exportRef = useRef<HTMLDivElement>(null)


    const fileChange =(e:ChangeEvent<HTMLInputElement>)=>{
        console.log(e);
        const file = e.currentTarget.files![0];
        if(file){
            const commaIndex = file?.name?.lastIndexOf('.')
            const fileName = file.name.slice(0,commaIndex)
            const extension = file?.name?.slice( commaIndex+1,file.name.length);
            const link = window.URL.createObjectURL(file);

            setFIleName(fileName);
            setFileExtension(extension);
            setFiltPath(link);
        }
    }

    const closeExporter=()=>{
        console.log('parent')
        setIsExport(false);
    }
    const openExporter=()=>{
        setIsExport(true);
    }

    const onOpenHover=()=>{
        setOpenHover(true)
    }
    const offOpenHover=()=>{
        setOpenHover(false)
    }

    return(
        <>
            <div className="flex items-center justify-center">
                <input className="w-0 h-0 opacity-0" type="file" name="file" id="file" onChange={fileChange}/>
                <label 
                onMouseMove={onOpenHover}
                onMouseLeave={offOpenHover}
                htmlFor="file"
                className="h-8 flex items-center text-white px-3 cursor-pointer
                rounded-md bg-[#64758b] select-none font-semibold
                ">
                    <FontAwesomeIcon
                    icon={['fas','download']}
                    className="w-5 h-5"/>
                    <span>
                        Open
                    </span>
                </label>
            </div>
            <div className="flex items-center justify-center"
            ref={exportRef}
            onClick={openExporter}
            >
                <div className="
                h-8 flex items-center text-white px-3 cursor-pointer
                rounded-md bg-[#64758b] select-none font-semibold">
                    <FontAwesomeIcon
                        icon={['fas','upload']}
                        className="w-5 h-5"/>
                        <span>Save</span>
                </div>
            </div>
            <Export/>
            <AnimatePresence>
            {
                    // isExport&&(
                        <div className='absolute top-0 left-0 w-full h-full z-20
                        bg-[#000000]/30 '
                        onClick={closeExporter}
                        >
                            {/* <Export/> */}
                            {/* <motion.ul 
                            style={{
                                x:exportRef.current?.offsetLeft,
                                y:exportRef.current?.offsetTop!+5,
                                    width:exportRef.current?.clientWidth!
                            }}
                            animate={'down'}
                            variants={variants}
                            exit={'up'}
                            className={`absolute 
                            h-0
                                rounded-md
                                overflow-hidden
                                grid
                            `}>
                                <ExportList label={'obj'}/>
                                <ExportList label={'fbx'}/>
                                <ExportList label={'stl'}/>
                                <ExportList label={'obj'}/>
                                </motion.ul> */}
                            
                        </div>
                    // )
                }
            </AnimatePresence>
        </>
    )
}

export default FileManager