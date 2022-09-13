
import {AnimatePresence, LayoutGroup, motion, MotionValue, useMotionValue} from 'framer-motion';
import { useRef, useState, useEffect, MouseEventHandler } from 'react';
import ModalLayout from '../modal/in-canvas-modal-layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Front from '../../assets/cube-front.svg'
import { PerspectiveCamera, Vector3 } from 'three'
import _ from 'lodash'
import useIsMobile from '../../hooks/useIsMobile'
import MiniCircleButton from '../common/mini-circle-button'
import CameraPositionBox, { CustomCameraFocus } from './camera-position-box';
import useMeasureStore from '../../store/measure.store';
import useMenuStore from '../../store/menu.store';
import useMeshStore, { useSelectMehsStore } from '../../store/mesh.store';
import useCameraStore, { useMeshBoxStore, useZoomBoxStore } from '../../store/camera.store';
import {faHouse,faArrowsToEye,faRuler} from '@fortawesome/free-solid-svg-icons'


const MiniControls=()=>{
    const [
        control,
        camera
    ]=useCameraStore((state)=>[
        state.control,
        state.camera,
    ])
    const setZoomBox=useZoomBoxStore((state)=>state.setZoomBox)
    const meshBox=useMeshBoxStore((state)=>state.meshBox)
    const setInitSelectMesh=useSelectMehsStore((state)=>state.setInitSelectMesh)

    const [
        onWire,
        toggleWire,
        setHoverMesh
    ]=useMeshStore((state)=>[
        state.onWire,
        state.setToggleWire,
        state.setHoverMesh
    ])
    const [measure,toggleMeasure]=useMeasureStore((state)=>[
        state.onMeasure,state.toggleMeasure
    ]);
    const onMiniControl = useMenuStore((state)=>state.onMiniControl)
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
      
        const size = meshBox.getSize(new Vector3());
        const maxDim = Math.max(size.x,size.y,size.z);
        const fov = camera?.fov!*(Math.PI/180);
        const cameraZ = Math.abs(maxDim/4*Math.tan(fov*2));
        
        camera?.up.set(0,1,0)
        setZoomBox({
            target:new Vector3(0,0,0),
            position:new Vector3(0,0,cameraZ)
        })
    }
    const onFitZoom=()=>{
        setZoomBox({
            box:_.cloneDeep(meshBox)
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



    const onMeasure=()=>{
        if(!measure){
            setInitSelectMesh();
            setHoverMesh(undefined)
        }
        toggleMeasure()
    }

    return (
        <ModalLayout type="SimpleControl" 
        onModal={onMiniControl}>
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
                    icon={faHouse}
                    size='lg'/>
                </MiniCircleButton>
                <MiniCircleButton onClick={onFitZoom}>
                     <FontAwesomeIcon
                        icon={faArrowsToEye}
                        size='lg'
                        />
                </MiniCircleButton>
                {/* <MiniCircleButton onClick={onText} pressState={meshState?.onText}>
                    {'Text'}
                </MiniCircleButton> */}
                <MiniCircleButton onClick={toggleWire} pressState={onWire}>
                    {'Wire'}
                </MiniCircleButton>
                <MiniCircleButton onClick={onMeasure} pressState={measure}>
                    <FontAwesomeIcon
                        icon={faRuler}
                        size='lg'/>
                </MiniCircleButton>
            </div>
        </ModalLayout>

    )
}

export default MiniControls;