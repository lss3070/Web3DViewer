

import Front from '../assets/cube-front.svg'
import Back from '../assets/cube-back.svg'
import Left from '../assets/cube-left.svg'
import Right from '../assets/cube-right.svg'
import Top from '../assets/cube-top.svg'
import Bottom from '../assets/cube-down.svg'
import {AnimatePresence, LayoutGroup, motion, MotionValue, useMotionValue} from 'framer-motion';
import { useRef, useState, useEffect, MouseEventHandler } from 'react';
import { useCommonSWR } from '../swrs/common.swr';
import { useMenuSWR } from '../swrs/menu.swr';
import ModalLayout from './modal-layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useCameraSWR } from '../swrs/camera.swr';
import { Vector3 } from 'three'
import _ from 'lodash'
import { useMeshSWR } from '../swrs/mesh.swr';
import { Slider } from 'antd'
import { useThree } from '@react-three/fiber';



interface MiniCircleButtonProps{
    label: JSX.Element|string,
    onClick?:MouseEventHandler<HTMLDivElement> ;
}
const MiniCircleButton:React.FC<MiniCircleButtonProps>=({label,onClick})=>{

    const {meshState,setOnText,setOnWire}=useMeshSWR();
    const [onDown,setOnDown]=useState<boolean>(false);
    const [onSelect,setOnSelect]=useState<boolean>(false);

    const OnActive=()=>{
        switch(label){
            case'Text':
                setOnText(!meshState?.onText!);
                setOnSelect(!meshState?.onText!)
            break;
            case'Wire':
                setOnWire(!meshState?.onWire!);
                setOnSelect(!meshState?.onWire!)
            break;
            default:
                // setOnSelect(!onSelect)
        }
    }

    useEffect(()=>{
        switch(label){
            case 'Text':
                setOnText(meshState?.onText!);
                setOnSelect(meshState?.onText!)
                break;
            case 'Wire':
                setOnText(meshState?.onWire!);
                setOnSelect(meshState?.onWire!)
                break
        }
    },[label])

    const onMouseDown=()=>{
            setOnDown(true);
            OnActive();
    }

    const onMouseUp=()=>{
        setOnDown(false)
    }

    return(
        <div className='rounded-full shadow-md'>
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
            onClick={onClick}
            // whileHover={{boxShadow:`${!onSelect?`3px 3px rgba(0, 0, 0, 0.2)`
            // :`inset 3px 5px rgba(0, 0, 0, 0.2)`}`}}
            className='w-8 h-8 
            dark:bg-gray-400
            bg-[#edf1f5]
            rounded-full flex 
            items-center justify-center 
            font-semibold cursor-pointer 
                '>
                        {label}
            </motion.div>
        </div>
    )
}

enum CustomCameraFocus{
    Front,Back,Left,Right,Top,Bottom
}

interface BoxProps{
    type:CustomCameraFocus
}


const CameraPositionBox:React.FC<BoxProps> =({type})=>{

    const {cameraState,setTarget,setPosition}=useCameraSWR()
    const switchBox=()=>{
        switch(type){
            case CustomCameraFocus.Front:
                return <Front/>
            case CustomCameraFocus.Back:
                return <Back/>
            case CustomCameraFocus.Left:
                return <Left/>
            case CustomCameraFocus.Right:
                return <Right/>
            case CustomCameraFocus.Top:
                return <Top/>
            case CustomCameraFocus.Bottom:
                return <Bottom/>
        }    
    }

    const onClick=()=>{
        setTarget(new Vector3(0,0,0));
        
        switch(type){
            case CustomCameraFocus.Front:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                0,0,cameraState?.meshBox.max.z!*2
                                ))
                break;
            case CustomCameraFocus.Back:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                0,0,cameraState?.meshBox.min.z!*2
                                ))
                break;
            case CustomCameraFocus.Left:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                    cameraState?.meshBox.max.x!*2,
                                0,0
                                ))
                break;
            case CustomCameraFocus.Right:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                    cameraState?.meshBox.min.x!*2,
                                0,0
                                ))
                break;
            case CustomCameraFocus.Top:
                cameraState?.camera?.current.up.set(0,0,1)
                setPosition(new Vector3(
                                    0,cameraState?.meshBox.max.y!*4,0
                                    ))
                break;
            case CustomCameraFocus.Bottom:
                cameraState?.camera?.current.up.set(0,0,1)
                setPosition(new Vector3(
                                    0,cameraState?.meshBox.min.y!*4,0
                                    ))
                break;
        }    
    }
    return  (
    <motion.div 
    whileHover={{scale:1.2,backgroundColor:'#ffffff'}}
    whileTap={{ backgroundColor:'#bdbdbd' }}
    className='w-8 h-8 p-1 cursor-pointer rounded-full 
    z-10 bg-gray-400 border'
    onClick={onClick}
    >
        {switchBox()}
    </motion.div>)
}


const MiniControls=()=>{
    const {cameraState,setSelectMeshBox,setTarget,setPosition}=useCameraSWR()
    const {menuState} =useMenuSWR();
    const {meshState,setWireWidth}=useMeshSWR()

    const [onCameraPositionList,setOnCameraPositionList]=useState<boolean>(false);
    const cameraPositionIconRef=useRef<HTMLDivElement>(null);


    const toggleCameraPositionList=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
        setOnCameraPositionList(!onCameraPositionList);
        e.stopPropagation();
    }
    const closeCameraPositionList=()=>{
        setOnCameraPositionList(false);
    }

    const cameraInit=()=>{
        cameraState?.camera?.current.up.set(0,1,0);
        setTarget(new Vector3(0,0,0));
        setPosition(new Vector3(0,0,59))
    }
    const onFitZoom=()=>{
        setSelectMeshBox(_.cloneDeep(cameraState?.meshBox!))
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


    const variants={
        show:{
            opacity:1,
        },
        hide:{
            opacity:0,

        }
    }

    const ChangeWire=(value: number)=>{
        setWireWidth(value);
    }

    return (
        <ModalLayout type="SimpleControl" 
        onModal={menuState?.simpleControl.on!}
        >
            <div 
            className="
            rounded-lg w-auto h-auto p-2
            flex gap-5 
            ">
                <motion.div className='w-8 h-8 p-1 cursor-pointer rounded-full 
                bg-gray-400 z-10'
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
                        <CameraPositionBox type={CustomCameraFocus.Front}/>
                        <CameraPositionBox type={CustomCameraFocus.Back}/>
                        <CameraPositionBox type={CustomCameraFocus.Left}/>
                        <CameraPositionBox type={CustomCameraFocus.Right}/>
                        <CameraPositionBox type={CustomCameraFocus.Top}/>
                        <CameraPositionBox type={CustomCameraFocus.Bottom}/>
                    </motion.div>
                )}
                </AnimatePresence>
                {/* <AnimatePresence>
                    
                    {meshState?.onWire&&(
                    <motion.div className=' text-white p-2 absolute right-0 top-10
                    border w-52
                    '>
                          <Slider min={0} max={100}
                        value={meshState.wireWidth}
                        onChange={ChangeWire}
                    />
                    </motion.div>)}
                </AnimatePresence> */}

                <MiniCircleButton 
                onClick={cameraInit}
                label={
                    <FontAwesomeIcon
                    icon={['fas','house']}
                    className="w-5 h-5 "/>
                }/>
                <MiniCircleButton
                onClick={onFitZoom}
                    label={
                        <FontAwesomeIcon
                        icon={['fas','arrows-to-eye']}
                        className="w-10 h-10"/>
                    }
                    />
                <MiniCircleButton label={'Text'}/>
                <MiniCircleButton label={'Wire'}/>
            </div>
        </ModalLayout>

    )
}

export default MiniControls;