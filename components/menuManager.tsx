import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import { useMenuSWR } from '../swrs/menu.swr';
import MiniButton from './mini-button';


interface CommonButtonProps{
    label:string
}
const MenuManageButton=({label}:CommonButtonProps)=>{

    const {menuState,onControl,onTreeList,onSimpleControl}= useMenuSWR();
    const [onDown,setOnDown]=useState<boolean>(false);
    const [onButton,setOnButton]=useState<boolean>(false);
    
    const Icon =()=>{
        switch(label){
            case'TreeList':
                return <FontAwesomeIcon
                icon={['fas','folder-tree']} 
                className="w-5 h-5 "/>
            case'Control':
                return <FontAwesomeIcon
                icon={['fas','screwdriver-wrench']}
                className="w-5 h-5 ]"/>
            case'Detail':
                return <FontAwesomeIcon
                icon={['fas','file-lines']}
                className="w-5 h-5 "/>
            case'SimpleControl':
                return <FontAwesomeIcon
                icon={['fas','wrench']}
                className="w-5 h-5 "/>
            }
    }

    const OnClick=()=>{
        switch(label){
            case'TreeList':
                onTreeList(!menuState?.treeList.on);
                setOnButton(!menuState?.treeList.on);
            break;
            case'Control':
                onControl(!menuState?.control.on);
                setOnButton(!menuState?.control.on);
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
        animate={{boxShadow:`${onButton?
        `inset 3px 5px rgba(0, 0, 0, 0.2)`
        :`inset 0px 0px rgba(0, 0, 0, 0.2)`}`,
    }}
        whileTap={{boxShadow:`
        ${onDown?`inset 5px 7px rgba(0, 0, 0, 0.2)`:
        onButton?`inset 3px 5px rgba(0, 0, 0, 0.2)`
        :`inset 0px 0px rgba(0, 0, 0, 0.2)`}
        `}}

        className={`rounded-md py-1 px-3 
        bg-[#9CB6D9] dark:bg-[#64758b]
         text-gray-600 dark:text-white
         cursor-pointer select-none font-semibold
        `}>
            {Icon()}{label}
        </motion.div>
    )
}

const MenuManager=()=>{

    const {menuState,onControl,onTreeList,onSimpleControl}= useMenuSWR();
    const onTreeClick=()=>{
        onTreeList(!menuState?.treeList.on);
    }
    const onControlClick=()=>{
        onControl(!menuState?.control.on);
    }
    const onSimpleControlClick=()=>{
        onSimpleControl(!menuState?.simpleControl.on);
    }
    return(
        <div className='flex items-center gap-5'>
        <MiniButton onClick={onTreeClick} onPressEvent={true}>
            <>
                <FontAwesomeIcon
                    icon={['fas','folder-tree']} 
                    className="w-5 h-5 "/>
                <span>TreeList</span>
            </>
        </MiniButton>
        <MiniButton onClick={onControlClick} onPressEvent={true}>
            <>
                <FontAwesomeIcon
                    icon={['fas','screwdriver-wrench']} 
                    className="w-5 h-5 "/>
                <span>Control</span>
            </>
        </MiniButton>
        <MiniButton onClick={onSimpleControlClick} onPressEvent={true}>
            <>
                <FontAwesomeIcon
                    icon={['fas','wrench']} 
                    className="w-5 h-5 "/>
                <span>SimpleControl</span>
            </>
        </MiniButton>
        </div>
    )
}
export default MenuManager