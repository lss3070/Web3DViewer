import { AnimatePresence, DragControls, motion, useDragControls, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"
import useIsMobile from "../../hooks/useIsMobile";
import { useMenuSWR } from '../../swrs/menu.swr';

interface IModalLayoutProps{
    type:'TreeList'|'Control'|'Detail'|'SimpleControl'
    children:JSX.Element[]|JSX.Element,
    onModal:boolean,
    drag?:boolean,
}

const InCanvasModalLayout=({type,children,onModal,drag=true}:IModalLayoutProps)=>{
    const {menuState,
        setSimpleControlPosition,
        setControlPosition,
        setTreeListPosition
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
            return menuState?.control.position&&'right-[0%] top-[50%]'
            case 'TreeList':
            return menuState?.treeList.position&&'left-[0px] top-[50%] '
            case 'SimpleControl':
            return menuState?.simpleControl.position&&'left-[50%] top-[5%]'
        }
    }
    // const onDragStart=()=>{
    //     console.log('drag')
    // }
    // const onDragEnd=()=>{
    //     console.log('drop');
    // }


    useEffect(()=>{
        if(onModal===undefined) return
            switch(type){
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

    useEffect(()=>{
        switch(type){
            case 'SimpleControl':
                if(!menuState?.simpleControl?.position){
                    x.set('-50%')
                }
                break;
            case 'Control':
                if(!menuState?.control?.position){
                    y.set('-50%')
                }
                break;
            case 'TreeList':
                if(!menuState?.treeList?.position){
                    y.set('-50%')
                }
                break;
        }
    },[])

    return(
        <AnimatePresence>
            {onModal&&(
                <motion.div
                drag={drag}
                // onDragStart={onDragStart}
                // onDragEnd={onDragEnd}
                dragConstraints={menuState?.dragArea}
                animate={'show'}
                exit={'hide'}
                variants={modalVariants}
                style={{x,y}}
                dragMomentum={false}
                className={`absolute 
                w-auto h-auto opacity-0 z-30
                rounded-lg
                shadow-lg
                border

                bg-white
                text-gray-600 
                border-gray-100

                dark:text-white
                dark:bg-slate-600
                dark:border-transparent
                 

                 ${staticPosition()}
                `}
                >
                    {children}
                </motion.div>

            )}
        </AnimatePresence>
    )
}

export default InCanvasModalLayout;