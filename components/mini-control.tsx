

import Front from '../assets/cube-front.svg'
import Back from '../assets/cube-back.svg'
import Left from '../assets/cube-left.svg'
import Right from '../assets/cube-right.svg'
import Top from '../assets/cube-top.svg'
import Down from '../assets/cube-down.svg'
import {AnimatePresence, LayoutGroup, motion, MotionValue, useMotionValue} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useCommonSWR } from '../swrs/common.swr';
import { useMenuSWR } from '../swrs/menu.swr';

interface BoxProps{
    children: JSX.Element,
}

interface MiniCircleButtonProps{
    label: JSX.Element|string,
}
const MiniCircleButton:React.FC<MiniCircleButtonProps>=({label})=>{


    const {commonState,setOnText,setOnWire} =useCommonSWR();
    const [onDown,setOnDown]=useState<boolean>(false);
    const [onSelect,setOnSelect]=useState<boolean>(false);

    const OnActive=()=>{
        switch(label){
            case'Text':
                console.log('eee')
                setOnText(!commonState?.onText!);
                setOnSelect(!commonState?.onText!)
            break;
            case'Wire':
                setOnWire(!commonState?.onWire!);
                setOnSelect(!commonState?.onWire!)
            break;
        }
    }

    useEffect(()=>{
        setOnText(commonState?.onText!);
        setOnSelect(commonState?.onText!)
    },[label])

    const onMouseDown=()=>{
        console.log('down')
        setOnDown(true);
        OnActive();
    }

    const onMouseUp=()=>{
        setOnDown(false)
    }

    return(
        <motion.div 
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        animate={{boxShadow:`${onSelect?`inset 1px 3px 1px rgba(0, 0, 0, 0.2)`
        :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}`}}
        whileTap={{boxShadow:`
        ${onDown?`inset 1px 5px 1px rgba(0, 0, 0, 0.2)`:
        onSelect?`inset 1px 3px 1px rgba(0, 0, 0, 0.2)`
        :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}
        `}}
        // whileHover={{boxShadow:`${!onSelect?`3px 3px rgba(0, 0, 0, 0.2)`
        // :`inset 3px 5px rgba(0, 0, 0, 0.2)`}`}}

        className='w-8 h-8 bg-white rounded-full flex 
            items-center justify-center font-semibold cursor-pointer 
            '>
                    {label}
        </motion.div>
    )
    
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

  
    const {menuState,setSimpleControlPosition} =useMenuSWR();

    const x=useMotionValue<number>(menuState?.simpleControl.x?
        menuState?.simpleControl.x:
        100);

    const y=useMotionValue(menuState?.simpleControl.y?
        menuState?.simpleControl.y:
        100);


    const [onCameraPositionList,setOnCameraPositionList]=useState<boolean>(false);
    const cameraPositionIconRef=useRef<HTMLDivElement>(null);
    // const [cameraPosition,setCameraPosition]=useState<boolean>(false);

    const toggleCameraPositionList=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setOnCameraPositionList(!onCameraPositionList);
        e.stopPropagation();
    }

    const closeCameraPositionList=()=>{
        setOnCameraPositionList(false);
    }
    const cameraVariants={
        down:{
            height:'auto',
            transition: { duration: 0.5 }
        },
        up:{
            height:0,
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

    useEffect(()=>{
        if(menuState?.simpleControl?.on){
            setSimpleControlPosition(x.get(),y.get());
        }
    },[menuState?.simpleControl?.on])


    const variants={
        show:{
            opacity:1,
        },
        hide:{
            opacity:0,

        }
    }


    return (
        <AnimatePresence>
            { menuState?.simpleControl.on&&(
                <motion.div 
        drag 
        animate={'show'}
        exit={'hide'}
        variants={variants}
        style={{x,y}}
        dragMomentum={false}
        className="absolute 
        rounded-lg w-auto h-auto p-2 opacity-0
        flex gap-5 bg-[#64758b]
        z-20
        ">
            <motion.div className='w-8 h-8 p-1 cursor-pointer border rounded-full bg-white z-10'
                    ref={cameraPositionIconRef}
                    onClick={toggleCameraPositionList}
                    >
                        <Front/>
            </motion.div>
                <AnimatePresence>
                    {onCameraPositionList&&(
                    <motion.div 
                    animate={'down'}
                    variants={cameraVariants}
                    exit={ 'up'}
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
                </AnimatePresence>
           <MiniCircleButton label={'Text'}/>
           <MiniCircleButton label={'Wire'}/>
             </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MiniControls;