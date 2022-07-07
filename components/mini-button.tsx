import { motion } from "framer-motion"
import { useState } from "react";

interface MiniButtonProps{
    children:JSX.Element;
    onClick:()=>void;
    onPressEvent?:boolean;
}
const MiniButton=({
    children,onClick,onPressEvent: pressCheck=false
}:MiniButtonProps)=>{

    const [mouseDown,setMouseDown]=useState<boolean>(false);
    const [onPress,setOnPress]=useState<boolean>(false);

    const onMouseDown=()=>{
        pressCheck&&setOnPress(true);
        setMouseDown(!mouseDown)
        onClick();
  
    }
    const onMouseUp=()=>{
        pressCheck&&setOnPress(false);
    }
    return(
        <motion.div 
        className="
        rounded-md py-1 px-3 
     
        bg-gray-[#9ca3af]
        dark:bg-[#64758b]
         text-gray-600 dark:text-white
            h-8 flex items-center cursor-pointer
        select-none font-semibold"
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
        </motion.div>
    )
}

export default MiniButton;