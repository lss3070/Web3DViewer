
import { motion, LayoutGroup,AnimatePresence, useDragControls } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLayout from '../modal-layout';
import { useMenuSWR } from '../../swrs/menu.swr';
import shortId from 'shortid';
import RemocornTabBox from './remocornTabBox';
import ActionTab from './actionTab';
import AnimationTab from './animationTab';
import CameraTab from './cameraTab';
import InfoTab from './infoTab';

const Remocorn =()=>{
    const [openId,setOpenId]=useState<string>('');
    const {menuState,onControl}=useMenuSWR()

    const closeRemocorn=()=>{
        onControl(false);
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
        onModal={menuState?.control.on!}
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
                    id={'0'}
                    openId={openId}
                    setOpenId={setOpenId}
                    >
                       <InfoTab/>
                    </RemocornTabBox>
                    <RemocornTabBox 
                    label={'Camera'} 
                    id={'1'}
                    openId={openId}
                    setOpenId={setOpenId}
                    >
                       <CameraTab/>
                    </RemocornTabBox>
                    <RemocornTabBox 
                    label={'Action'} 
                    id={'2'}
                    openId={openId}
                    setOpenId={setOpenId}
                    >
                        <ActionTab/>
                    </RemocornTabBox>
                    <RemocornTabBox 
                    label={'Animation'} 
                    id={'3'}
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