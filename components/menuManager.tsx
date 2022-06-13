import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import { useMenuSWR } from '../swrs/menu.swr';


interface CommonButtonProps{
    label:string
}
const CommonButton=({label}:CommonButtonProps)=>{

    const {menuState,onControl,onDetail,onTreeList,onSimpleControl}= useMenuSWR();
    const [onDown,setOnDown]=useState<boolean>(false);
    const [onButton,setOnButton]=useState<boolean>(false);
    
    const OnClick=()=>{
        switch(label){
            case'TreeList':
                onTreeList(!menuState?.OnTreeList);
                setOnButton(!menuState?.OnTreeList);
            break;
            case'Control':
                onControl(!menuState?.OnControl);
                setOnButton(!menuState?.OnControl);
            break;
            case'Detail':
                onDetail(!menuState?.OnDetail);
                setOnButton(!menuState?.OnDetail);
            break;
            case'SimpleControl':
                onSimpleControl(!menuState?.simpleControl.on);
                setOnButton(!menuState?.simpleControl.on);
            break;
        }
    }

    useEffect(()=>{
        OnClick();
    },[label])

    const onMouseDown=()=>{
        setOnDown(true);
        OnClick();
    }

    const onMouseUp=()=>{
        setOnDown(false)
    }
    
    return(
        <motion.div
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        // onClick={()=>setOnButton(!onButton)}
        animate={{boxShadow:`${onButton?`inset 3px 5px rgba(0, 0, 0, 0.2)`
        :`inset 0px 0px rgba(0, 0, 0, 0.2)`}`}}
        whileTap={{boxShadow:`
        ${onDown?`inset 5px 7px rgba(0, 0, 0, 0.2)`:
        onButton?`inset 3px 5px rgba(0, 0, 0, 0.2)`
        :`inset 0px 0px rgba(0, 0, 0, 0.2)`}
        `}}
        // whileHover={{boxShadow:`${!onButton?`3px 3px rgba(0, 0, 0, 0.2)`
        // :`inset 3px 5px rgba(0, 0, 0, 0.2)`}`}}

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
                <CommonButton label={'SimpleControl'}/>
            </div>
        </>
    )
}
export default MenuManager