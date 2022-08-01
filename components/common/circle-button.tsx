import { motion } from "framer-motion";
import { useState } from "react";

interface ICircleButton{
    children:JSX.Element|JSX.Element|string;
    onClick:()=>void;
    pressState?:boolean;
}

const CircleButton=({
    children,
    onClick,
    }:ICircleButton)=>{

    const [select,setSelect]=useState<boolean>(false);
    
    const onMouseDown=()=>{
        setSelect(true);
    }
    const onMouseUp=()=>{
        setSelect(false);
    }

    return(
      <div className='shadow-lg rounded-full'>
        <motion.div
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onClick={onClick}
          animate={{boxShadow:`${select?`inset 1px 3px 1px rgba(0, 0, 0, 0.2)`
          :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}`}}
          whileTap={{boxShadow:`
          ${select?`inset 2px 6px 2px rgba(0, 0, 0, 0.2)`
          :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}
          `}}
          className='w-12 h-12
          dark:bg-gray-600
          dark:border-transparent
          bg-white
          border
           border-gray-100
          rounded-full flex 
          items-center justify-center 
          font-semibold cursor-pointer
              '>
          {children}
        </motion.div>
      </div>
    )
}

export default CircleButton