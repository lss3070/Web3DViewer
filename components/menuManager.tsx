import {motion} from 'framer-motion'
import { useState } from 'react';


interface CommonBUttonProps{
    label:string
}
const CommonButton=({label}:CommonBUttonProps)=>{
    const [onButton,setOnButton]=useState<boolean>(false);
    
    return(
        <motion.div
        onMouseDown={()=>setOnButton(!onButton)}
        // onClick={()=>setOnButton(!onButton)}
        animate={{boxShadow:`
        ${onButton?`inset 3px 5px rgba(0, 0, 0, 0.2)`
        :`inset 0px 0px rgba(0, 0, 0, 0.2)`}
        `}}
        whileHover={{boxShadow:`${!onButton?`3px 3px rgba(0, 0, 0, 0.2)`
        :`inset 3px 5px rgba(0, 0, 0, 0.2)`}`}}

        className={`rounded-md py-1 px-3 bg-[#64758b]
        text-white cursor-pointer select-none font-semibold`}>
            {label}
        </motion.div>
    )
}

const MenuManager=()=>{
    return(
        <>
            <div className="flex items-center justify-center
            ">
                <CommonButton label={'TreeList'}/>
            </div>
            <div className="flex items-center justify-center">
                <CommonButton label={'Control'}/>
            </div>
            <div className="flex items-center justify-center">
                <CommonButton label={'Detail'}/>
            </div>
            <div className='flex items-center justify-center'>
                <CommonButton label={'Simple Control'}/>
            </div>
        </>
    )
}
export default MenuManager