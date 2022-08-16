import { AnimatePresence, DragControls, motion, useDragControls, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"
import useMenuStore from "../../store/menu.store";

interface IModalLayoutProps{
    type:'TreeList'|'Control'|'Detail'|'SimpleControl'
    children:JSX.Element[]|JSX.Element,
    onModal:boolean,
    drag?:boolean,
}

const InCanvasModalLayout=({type,children,onModal,drag=true}:IModalLayoutProps)=>{

    const [
        treePosition,
        controlPosition,
        miniControlPosition,
        dragArea,
        setTreeListPosition,
        setControlPosition,
        setSimpleControlPosition
    ]=useMenuStore((state)=>[
        state.treePosition,
        state.controlPosition,
        state.miniControlPosition,
        state.dragArea,

        state.setTreePosition,
        state.setControlPosition,
        state.setMiniControlPosition
    ])
    

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
            return controlPosition&&'right-[0%] top-[50%]'
            case 'TreeList':
            return treePosition&&'left-[0px] top-[50%] '
            case 'SimpleControl':
            return miniControlPosition&&'left-[50%] top-[5%]'
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
                    controlPosition&&onModal?
                        setPosition(
                            controlPosition.x!,
                            controlPosition.y!):
                        setControlPosition({
                            x:x.get(),
                            y:y.get()
                        });
                    break;
                case 'TreeList':
                    treePosition&&onModal?
                        setPosition(
                            treePosition.x!,
                            treePosition.y!):
                        setTreeListPosition({
                            x:x.get(),
                            y:y.get()
                        });
                    break;
                case 'SimpleControl':
                    miniControlPosition&&onModal?
                        setPosition(
                            miniControlPosition.x!,
                            miniControlPosition.y!):
                        setSimpleControlPosition({
                            x:x.get(),
                            y:y.get()
                        });
                    break;
            }
    },[onModal])

    useEffect(()=>{
        switch(type){
            case 'SimpleControl':
                if(!miniControlPosition){
                    x.set('-50%')
                }
                break;
            case 'Control':
                if(!controlPosition){
                    y.set('-50%')
                }
                break;
            case 'TreeList':
                if(!treePosition){
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
                dragConstraints={dragArea}
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