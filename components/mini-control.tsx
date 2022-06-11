

import Front from '../assets/cube-front.svg'
import Back from '../assets/cube-back.svg'
import Left from '../assets/cube-left.svg'
import Right from '../assets/cube-right.svg'
import Top from '../assets/cube-top.svg'
import Down from '../assets/cube-down.svg'
import {motion} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface BoxProps{
    children: JSX.Element,
}

interface MiniCircleButtonProps{
    children: JSX.Element|string,
}
const MiniCircleButton=({children}:MiniCircleButtonProps)=>{
    const [onSelect,setOnSelect]=useState<boolean>(false);

    <motion.div 
    className='w-8 h-8 bg-white rounded-full flex 
        items-center justify-center font-semibold cursor-pointer 
        shadow-inner shadow-black'>
                 {children}
    </motion.div>
}
const CameraPositionBox:React.FC<BoxProps> =({children})=>{
    return  (
    <motion.div 
    whileHover={{scale:1.2,backgroundColor:'#ffffff'}}
    whileTap={{ backgroundColor:'#bdbdbd' }}
    className='w-8 h-8 p-1 cursor-pointer rounded-full 
    z-10 bg-gray-400'>
        {children}
    </motion.div>)
}

const MiniControls=()=>{

    const [onCameraPositionList,setOnCameraPositionList]=useState<boolean>(false);
    const cameraPositionIconRef=useRef<HTMLDivElement>(null);
    // const [cameraPosition,setCameraPosition]=useState<boolean>(false);

    const openCameraPositionList=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setOnCameraPositionList(true);
        e.stopPropagation();
    }

    const closeCameraPositionList=()=>{
        setOnCameraPositionList(false);
    }
    const cameraVariants={
        down:{
            height:'auto',
            // rotate: [0, -30, 0], 
            transition: { duration: 0.5 }
        },
        up:{
            height:0,
            y: [0, -100, 0], transition: { repeat: Infinity, repeatDelay: 3 }
        }
    }

    useEffect(()=>{
        if(onCameraPositionList){
            document.addEventListener('click',closeCameraPositionList)
            return ()=>{
                document.removeEventListener('click',closeCameraPositionList)
            } 
        }
    },[onCameraPositionList])

    return(
        <div className="absolute 
        rounded-lg w-auto h-auto p-2 left-[300px] top-10
        flex gap-5 bg-[#64758b]
        ">
            <div className='w-8 h-8 p-1 cursor-pointer border rounded-full bg-white z-10'
            ref={cameraPositionIconRef}
            onClick={openCameraPositionList}
            >
                <Front/>
            </div>
           
            <motion.div className='w-8 h-8 bg-white rounded-full flex 
            items-center justify-center font-semibold cursor-pointer 
             shadow-inner shadow-black
            '
            
            >
                Text
            </motion.div>
            <div className='w-8 h-8 bg-white  rounded-full flex 
            items-center justify-center font-semibold
            shadow-inner shadow-black
            '>
                Wire
            </div>

            {onCameraPositionList&&(
                    <motion.div 
                    animate={onCameraPositionList?'down':'up'}
                    variants={cameraVariants}
                    className='h-0 absolute overflow-hidden  rounded-full pb-2 bg-[#64758b]' 
                    >
                        <div className='h-8'></div>
                        <CameraPositionBox>
                            <Front/>
                        </CameraPositionBox>
                        <CameraPositionBox>
                            <Back/>
                        </CameraPositionBox>
                        <CameraPositionBox>
                            <Left/>
                        </CameraPositionBox>
                        <CameraPositionBox>
                            <Right/>
                        </CameraPositionBox>
                        <CameraPositionBox>
                            <Down/>
                        </CameraPositionBox>
                    </motion.div>
            )}

        </div>
    )
}

export default MiniControls