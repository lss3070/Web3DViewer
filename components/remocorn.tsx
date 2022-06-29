
import { motion, LayoutGroup,AnimatePresence, useDragControls } from 'framer-motion';
import { useState } from 'react';
import Category, { TabCategoryProps } from './category';
import { AutoZoomHelper } from './helper/camera/autoZoomHelper';
import { AmbientLightHelper } from './helper/light/ambientLight';
import { PointLightHelper } from './helper/light/pointLightHelper';
import { SpotLightHelper } from './helper/light/spotLight';
import { PositionHelper } from './helper/action/positionHelper';
import { PositionMoveHelper } from './helper/camera/positionMoveHelper';
import { TargetMoveHelper } from './helper/camera/targetMoveHelper';
import { RotationHelper } from './helper/action/rotationHelper';
import { ScaleHelper } from './helper/action/scaleHelper';
import { VisibleHelper } from './helper/action/visibleHelper';
import ActionHelper from './helper2/actionHelper';
import AnimationHelper from './helper2/animationHelper';
import CommonHelper from './helper2/commonHelper';
import { CameraHelper } from './helper2/cameraHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLayout from './modal-layout';
import { useMenuSWR } from '../swrs/menu.swr';
import InfoHelper from './helper2/infoHelper';

const Remocorn =()=>{
    const [openId,setOpenId]=useState<number>();
    const {menuState}=useMenuSWR()

    const [drag,setDrag]=useState<boolean>(true)

    const lightInfo:TabCategoryProps={
        label:'Light',
        id:1,
        openId,
        setOpenId,
        tabList:[
            {
                label:'AmbientLight',
                index:0,
                content:<AmbientLightHelper/>
            },
            {
                label:'PointLight',
                index:1,
                content:<PointLightHelper/>
            },
            {
                label:'SpotLight',
                index:2,
                content:<SpotLightHelper/>
            }
        ]
    }

      
    
    return(
        <ModalLayout type="Control" 
        onModal={menuState?.control.on!}
        drag={drag}>
            <div 
            className="rounded-lg 
             w-72 h-auto px-4 pb-4
            bg-gray-200
            dark:bg-slate-600
            ">
                <div className='w-full flex items-center justify-center h-12
                 '>
                    <div className='text-white w-full text-base font-semibold'>
                        <FontAwesomeIcon
                                icon={['fas','screwdriver-wrench']}
                                className="w-8 h-8 text-white cursor-pointer"/>
                        <span>
                            Control
                        </span>
                    </div>
                    <div className='w-full flex justify-end'>
                        <FontAwesomeIcon
                            icon={['fas','xmark']}
                            className="w-8 h-8 text-white cursor-pointer text-lg font-bold"/>
                    </div>
                </div>
                <div className='grid gap-5 cursor-auto'
                onMouseDown={(e)=>setDrag(false)}
                onMouseLeave={(e)=>setDrag(true)}
                >
                    {/* info */}
                    <InfoHelper 
                    openId={openId} 
                    setOpenId={setOpenId}/>
                    {/* camera */}
                    <CameraHelper 
                    openId={openId} 
                    setOpenId={setOpenId}/>
                    {/* light */}
                    {/* <Category {...lightInfo}/> */}
                    {/* action */}
                    <ActionHelper 
                    
                    openId={openId} 
                    setOpenId={setOpenId}/>
                    {/* animation */}
                    <AnimationHelper 
                    openId={openId} 
                    setOpenId={setOpenId}/>
                </div>
            </div>
        </ModalLayout>
            
)
}
export default Remocorn;