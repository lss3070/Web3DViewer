
import { motion, LayoutGroup,AnimatePresence, useDragControls } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLayout from '../modal/in-canvas-modal-layout';
import RemocornTabBox from './common/remocornTabBox';
import ActionTab from './action';
import AnimationTab from './animation';
import CameraTab from './camera';
import InfoTab from './info';
import useMenuStore from '../../store/menu.store';

const Remocorn =()=>{
    const [openId,setOpenId]=useState<string>('');

    const [
        onControl,
        toggleControl
    ] = useMenuStore((state)=>[
        state.onControl,
        state.toggleControl
    ])
    const closeRemocorn=()=>{
        toggleControl();
    }

    const [drag,setDrag]=useState<boolean>(true)

    const ableDrag=()=>{
        setDrag(true)
    }
    const disableDrag=()=>{
        setDrag(false)
     
    }
      
    
    return(
        <ModalLayout type="Control" 
        onModal={onControl}
        drag={drag}>
            <div 
            className="rounded-lg 
             w-72 h-auto px-4 pb-4">
                <div className='w-full flex items-center justify-center h-12
                 '>
                    <div className='w-full text-base font-semibold'>
                        <FontAwesomeIcon
                                icon={['fas','screwdriver-wrench']}
                                className="w-8 h-8 cursor-pointer"/>
                        <span>
                            Control
                        </span>
                    </div>
                    <div className='w-full flex justify-end'>
                        <FontAwesomeIcon
                            onClick={closeRemocorn}
                            icon={['fas','xmark']}
                            size="lg"
                            className="cursor-pointer font-bold"/>
                    </div>
                </div>
                <div className='grid gap-5 cursor-auto'
                // onMouseDown={disableDrag}
                onMouseLeave={ableDrag}
                onMouseDownCapture={disableDrag}
                >
                    <RemocornTabBox 
                    label={'Info'} 
                    id={'infoId'}
                    openId={openId}
                    setOpenId={setOpenId}
                    >
                       <InfoTab/>
                    </RemocornTabBox>
                    <RemocornTabBox 
                    label={'Camera'} 
                    id={'cameraId'}
                    openId={openId}
                    setOpenId={setOpenId}
                    >
                       <CameraTab/>
                    </RemocornTabBox>
                    <RemocornTabBox 
                    label={'Action'} 
                    id={'actionId'}
                    openId={openId}
                    setOpenId={setOpenId}
                    >
                        <ActionTab/>
                    </RemocornTabBox>
                    <RemocornTabBox 
                    label={'Animation'} 
                    id={'animationId'}
                    openId={openId}
                    setOpenId={setOpenId}
                    >
                        <AnimationTab/>
                    </RemocornTabBox>
                </div>
            </div>
        </ModalLayout>
            
)
}
export default Remocorn;