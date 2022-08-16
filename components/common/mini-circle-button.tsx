import { motion } from "framer-motion";
import { MouseEventHandler, useEffect, useState } from "react";

interface MiniCircleButtonProps{
    children: JSX.Element|string,
    onClick:()=>void ;
    pressState?:boolean;
}


const MiniCircleButton:React.FC<MiniCircleButtonProps>=({children,onClick,pressState})=>{

    const [onDown,setOnDown]=useState<boolean>(false);
    const [onSelect,setOnSelect]=useState<boolean>(false);

    const onMouseDown=()=>{
        setOnSelect(true)
    }

    const onMouseUp=()=>{
        setOnSelect(false)
    }
    const onClickEvent=()=>{
        if(pressState!==undefined) setOnDown(!onDown);
        onClick();
    }

    useEffect(()=>{
        if(pressState!==undefined)setOnDown(pressState);
    },[pressState])

    return(
        <div className='rounded-full shadow-md'>
            <motion.div
            onTouchStart={onMouseDown}
            onTouchEnd={onMouseUp}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            animate={{boxShadow:`${onDown?`inset 1px 3px 1px rgba(0, 0, 0, 0.2)`
            :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}`}}
            whileTap={{boxShadow:`
            ${onSelect?`inset 1px 5px 1px rgba(0, 0, 0, 0.2)`:
            onDown?`inset 1px 3px 1px rgba(0, 0, 0, 0.2)`
            :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}
            `}}
            onClick={onClickEvent}
            // whileHover={{boxShadow:`${!onSelect?`3px 3px rgba(0, 0, 0, 0.2)`
            // :`inset 3px 5px rgba(0, 0, 0, 0.2)`}`}}
            className='w-8 h-8 
            dark:bg-gray-400
            bg-[#edf1f5]
            rounded-full flex 
            items-center justify-center 
            font-semibold cursor-pointer 
                '>
                        {children}
            </motion.div>
        </div>
    )
}

export default MiniCircleButton