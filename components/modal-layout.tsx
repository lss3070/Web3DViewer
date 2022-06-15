import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"
import { useMenuSWR } from '../swrs/menu.swr';

interface IModalLayoutProps{
    type:'TreeList'|'Control'|'Detail'|'SimpleControl'
    children:JSX.Element[]|JSX.Element,
    onModal:boolean

}


const ModalLayout=({type,children,onModal}:IModalLayoutProps)=>{

    const {menuState,
        setSimpleControlPosition,
        setControlPosition,
        setTreeListPosition,
        setDetailPosition
    }=useMenuSWR();

    const x =useMotionValue<string|number>(0);
    const y =useMotionValue<string|number>(0);

    const modalVariants={
        show:{
            opacity:1,
        },
        hide:{
            opacity:0,

        }
    }
    
    const setPosition =(orX:number|string,orY:number|string)=>{
        x.set(orX);
        y.set(orY)
    }

    const staticPosition=()=>{
        switch(type){
            case 'Control':
            return menuState?.control.position&&'right-[23%] top-[120px]'
            case 'TreeList':
            return menuState?.treeList.position&&'left-[0px] top-[100px]'
            case 'Detail':
            return menuState?.detail.position&&'left-[50%] top-[10%]'
            case 'SimpleControl':
            return menuState?.simpleControl.position&&'left-[50%] top-[5%]'
        }
    }

    useEffect(()=>{
        if(onModal===undefined) return
            switch(type){
                case 'Detail':
                    menuState?.detail?.position&&onModal?
                        setPosition(
                            menuState?.detail.position?.x!,
                            menuState?.detail.position?.y!):
                        setDetailPosition(x.get(),y.get());
                    break;
                case 'Control':
                    menuState?.control?.position&&onModal?
                        setPosition(
                            menuState?.control.position?.x!,
                            menuState?.control.position?.y!):
                        setControlPosition(x.get(),y.get());
                    break;
                case 'TreeList':
                    menuState?.treeList?.position&&onModal?
                        setPosition(
                            menuState?.treeList.position?.x!,
                            menuState?.treeList.position?.y!):
                        setTreeListPosition(x.get(),y.get());
                    break;
                case 'SimpleControl':
                    menuState?.simpleControl?.position&&onModal?
                        setPosition(
                            menuState?.simpleControl.position?.x!,
                            menuState?.simpleControl.position?.y!):
                        setSimpleControlPosition(x.get(),y.get());
                    break;
            }
    },[onModal])


    return(
        <AnimatePresence>
            {onModal&&(
                <motion.div
                drag 
                animate={'show'}
                exit={'hide'}
                variants={modalVariants}
                style={{x,y}}
                dragMomentum={false}
                className={`absolute 
                w-auto h-auto opacity-0 z-20
                 ${staticPosition()}
                `}
                >
                    {children}
                </motion.div>

            )}
        </AnimatePresence>
    )
}

export default ModalLayout;