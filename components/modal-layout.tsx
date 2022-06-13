import { AnimatePresence, motion, useMotionValue } from "framer-motion"
import { useEffect, useState } from "react"
import { useMenuSWR } from '../swrs/menu.swr';

interface IModalLayoutProps{
    type:'TreeList'|'Control'|'Detail'|'SimpleControl'
    children:JSX.Element;
}


const ModalLayout=({type,children}:IModalLayoutProps)=>{

    const [onModal,setOnModal]=useState<boolean>(false);
    const {menuState}=useMenuSWR();

    const x=useMotionValue(0);

    const y=useMotionValue(0);

    const modalVariants={
        show:{
            opacity:1,
        },
        hide:{
            opacity:0,

        }
    }

    useEffect(()=>{
        switch(type){
            case'SimpleControl':
                setOnModal(menuState?.simpleControl.on!);
                x.set(menuState?.simpleControl.x!);
                y.set(menuState?.simpleControl.y!);
                break;
        }
    },[type]);


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
                className="absolute 
                rounded-lg w-auto h-auto p-2 opacity-0
                flex gap-5 bg-[#64758b]
                z-20"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}