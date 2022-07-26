import { motion } from "framer-motion"
import { useState, useEffect } from 'react';

interface MiniButtonProps{
    children:JSX.Element|string;
    onClick:()=>void;
    htmlFor?:string;
    pressState?:boolean;
}
const MiniButton=({
    children,
    onClick,
    htmlFor,
    pressState
}:MiniButtonProps)=>{

    const [mouseDown,setMouseDown]=useState<boolean>(false);
    const [onPress,setOnPress]=useState<boolean>(false);

    const onMouseDown=()=>{
        setOnPress(true);
    }
    const onMouseUp=()=>{
        setOnPress(false);
    }
    const onMouseClick=()=>{
        if(pressState!==undefined) setMouseDown(!mouseDown);
        onClick();
    }
    useEffect(()=>{
        if(pressState!==undefined)setMouseDown(pressState);
    },[pressState])

    return(
        <div className="rounded-md border
        border-gray-50

        dark:border-[#64758b]
        bg-white
        dark:bg-[#64758b]

        shadow-lg">
            <motion.label 
            htmlFor={htmlFor}
            className="
            rounded-md py-1 px-3 
            text-gray-600 
            dark:text-white
            h-8 flex items-center cursor-pointer
            select-none font-semibold
            "
            onClick={onMouseClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            animate={{boxShadow:`${mouseDown?
                `inset 3px 5px rgba(0, 0, 0, 0.2)`
                :`inset 0px 0px rgba(0, 0, 0, 0.2)`}`,
            }}
                whileTap={{boxShadow:`
                ${onPress?`inset 5px 7px rgba(0, 0, 0, 0.2)`:
                mouseDown?`inset 3px 5px rgba(0, 0, 0, 0.2)`
                :`inset 0px 0px rgba(0, 0, 0, 0.2)`}
                `}}
            >
                    {children}
            </motion.label>
        </div>
   
    )
}

export default MiniButton;