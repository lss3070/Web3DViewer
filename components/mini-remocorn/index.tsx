
import {AnimatePresence, LayoutGroup, motion, MotionValue, useMotionValue} from 'framer-motion';
import { useRef, useState, useEffect, MouseEventHandler } from 'react';
import { useCommonSWR } from '../../swrs/common.swr';
import { useMenuSWR } from '../../swrs/menu.swr';
import ModalLayout from '../modal/in-canvas-modal-layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Front from '../../assets/cube-front.svg'

import { useCameraSWR } from '../../swrs/camera.swr';
import { PerspectiveCamera, Vector3 } from 'three'
import _ from 'lodash'
import { useMeshSWR } from '../../swrs/mesh.swr';
import useIsMobile from '../../hooks/useIsMobile'
import MiniCircleButton from '../common/mini-circle-button'
import { useMeasureSWR } from '../../swrs/measure.swr';
import CameraPositionBox, { CustomCameraFocus } from './camera-position-box';
import { useBounds } from '@react-three/drei';


const MiniControls=()=>{
    const {cameraState,setZoomBox}=useCameraSWR()
    const {menuState} =useMenuSWR();
    const {meshState,setOnText,setOnWire,setHoverMesh,setInitSelectMesh}=useMeshSWR()
    const {measureState,setOnMeasure}=useMeasureSWR()
    const isMobile = useIsMobile()

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
      
        const size = cameraState!.meshBox.getSize(new Vector3());
        const maxDim = Math.max(size.x,size.y,size.z);
        const fov = (cameraState?.camera?.current as PerspectiveCamera).fov*(Math.PI/180);
        const cameraZ = Math.abs(maxDim/4*Math.tan(fov*2));
        
        cameraState?.camera?.current.up.set(0,1,0)
        setZoomBox({
            target:new Vector3(0,0,0),
            position:new Vector3(0,0,cameraZ)
        })
    }
    const onFitZoom=()=>{
        setZoomBox({
            box:_.cloneDeep(cameraState?.meshBox!)
        })
    }

    const cameraVariants={
        down:{
            height:'auto',
            transition: { duration: 0.5 }
        },
        up:{
            height:0,
            border:'none'
        }
    }

    useEffect(()=>{
        if(onCameraPositionList){
            document.addEventListener('click',closeCameraPositionList)
            document.addEventListener('touchend',closeCameraPositionList)
            return ()=>{
                document.removeEventListener('click',closeCameraPositionList)
                document.removeEventListener('touchend',closeCameraPositionList)
            } 
        }
    },[onCameraPositionList])

    const onWire=()=>{
        setOnWire(!meshState?.onWire!)
    }
    const onText=()=>{
        setOnText(!meshState?.onText!)
    }
    const onMeasure=()=>{
        if(!measureState?.onMeasure){
            setInitSelectMesh();
            setHoverMesh(undefined)
        }
     
        setOnMeasure(!measureState?.onMeasure!)
    }

    return (
        <ModalLayout type="SimpleControl" 
        onModal={menuState?.simpleControl.on!}

        >
            <div 
            className="
            rounded-lg w-auto h-auto p-2
            flex space-x-2 ml-0
            ">
                <motion.div className='w-8 h-8 p-1 cursor-pointer rounded-full 
                dark:bg-gray-400
                bg-[#edf1f5]
                shadow-lg
                border
                border-gray-100
                 dark:border-transparent
                z-10'
                        ref={cameraPositionIconRef}
                        onClick={toggleCameraPositionList}
                        >
                            <Front/>
                </motion.div>
                <AnimatePresence>
                    {onCameraPositionList&&(
                    <motion.div 
                    style={{margin:0}}
                    animate={'down'}
                    variants={cameraVariants}
                    exit={ 'up'}
                    className='h-0 absolute overflow-hidden  rounded-full pb-2 
                    bg-[white]
                    dark:bg-gray-600
                    shadow-lg
                    border
                     border-gray-100
                    dark:border-transparent
                    ' 
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
                <MiniCircleButton onClick={cameraInit}>
                      <FontAwesomeIcon
                    icon={['fas','house']}
                    className="w-5 h-5 "/>
                </MiniCircleButton>
                <MiniCircleButton onClick={onFitZoom}>
                     <FontAwesomeIcon
                        icon={['fas','arrows-to-eye']}
                        className="w-10 h-10"/>
                </MiniCircleButton>
                {/* <MiniCircleButton onClick={onText} pressState={meshState?.onText}>
                    {'Text'}
                </MiniCircleButton> */}
                <MiniCircleButton onClick={onWire} pressState={meshState?.onWire}>
                    {'Wire'}
                </MiniCircleButton>
                <MiniCircleButton onClick={onMeasure} pressState={measureState?.onMeasure}>
                    <FontAwesomeIcon
                        icon={['fas','ruler']}
                        className="w-10 h-10"/>
                </MiniCircleButton>
            </div>
        </ModalLayout>

    )
}

export default MiniControls;