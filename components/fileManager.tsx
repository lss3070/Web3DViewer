

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { useCommonSWR } from '../swrs/common.swr';
import {motion} from 'framer-motion';

type Position ={
    x:number;
    y:number;
}

const FileManager=()=>{
    const {setFiltPath,setFileExtension}=useCommonSWR();
    const [isExport,setIsExport]=useState<boolean>(false);

    const exportRef = useRef<HTMLDivElement>(null)

    const [dynamicPosition,setDynamicPosition]=useState<Position>({
        x:0,y:0
    });

    const fileChange =(e:ChangeEvent<HTMLInputElement>)=>{
        const file = e.currentTarget.files![0];
        const extension = file?.name?.substr(file?.name?.lastIndexOf('.') + 1);
        const link = window.URL.createObjectURL(file);

        setFileExtension(extension);
        setFiltPath(link);
    }


    
    const closeExporter=()=>{
        setIsExport(false);
    }
    const openExporter=()=>{
        setIsExport(true);
    }
    
    useEffect(()=>{
        setDynamicPosition({
            x:exportRef.current?.offsetTop!,
            y:exportRef.current?.offsetLeft!,
        })
    },[exportRef])

    const variants={
        down:{
            rotate: [0, -30, 0], transition: { duration: 0.5 }
        },
        up:{
            y: [0, -10, 0], transition: { repeat: Infinity, repeatDelay: 3 }
        }
    }

    return(
        <>
            <div className="flex items-center justify-center">
                <input className="w-0 h-0 opacity-0" type="file" name="file" id="file" onChange={fileChange}/>
                <label htmlFor="file"
                className="h-8 flex items-center bg-[#bdbdbd] text-white px-3 cursor-pointer"
                >
                    <FontAwesomeIcon
                    icon={['fas','download']}
                    className="w-5 h-5"/>
                    <span>
                        choose file
                    </span>
                </label>
            </div>
            <div className="flex items-center justify-center"
            ref={exportRef}
            onClick={openExporter}
            >
                <div className="h-8 flex items-center bg-[#bdbdbd] text-white px-3 cursor-pointer">
                <FontAwesomeIcon
                    icon={['fas','upload']}
                    className="w-5 h-5"/>
                    <span>export file</span>
            </div>
 
                {/* <select onChange={()=>{
                const exporter = new OBJExporter();
                const ee= exporter.parse(commonState?.scene?.current!)
                    const blob = new Blob([ee],{type:'application/object'})
                    const link =document.createElement('a');
                    link.download='test.obj'
                    link.href= window.URL.createObjectURL(blob);
                    link.click();
                
                }}>
                    <option>obj</option>
                    <option>fbx</option>
                </select> */}
                
            </div>
            {
                    isExport&&(
                        <div className='absolute top-0 left-0 w-full h-full z-10
                        bg-[#000000]/30 cursor-pointer'
                        onClick={closeExporter}
                        >
                           <motion.ul 
                           
                           animate={isExport?'down':'up'}
                           variants={variants}
                           className={`absolute 
                           w-[${exportRef.current?.clientWidth!}]
                           top-[${dynamicPosition.x}px] 
                           left-[${dynamicPosition.y}px]
                           border
                           `}>
                                <motion.li>obj</motion.li>
                                <motion.li>obj</motion.li>
                                <motion.li>obj</motion.li>
                                <motion.li>obj</motion.li>
                            </motion.ul>
                        </div>
                    )
                }
        </>
    )
}

export default FileManager