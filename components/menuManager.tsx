import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import { useMenuSWR } from '../swrs/menu.swr';


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
        // whileHover={{
        //     boxShadow:`2px 2px rgba(0,0,0,0.2)`
        // }}
  
    
        // whileHover={{boxShadow:`${!onButton?`3px 3px rgba(0, 0, 0, 0.2)`
        // :`inset 3px 5px rgba(0, 0, 0, 0.2)`}`}}

        className={`rounded-md py-1 px-3 bg-[#64758b]
        text-white cursor-pointer select-none font-semibold
        `}>
            {Icon()}{label}
        </motion.div>
    )
}

const MenuManager=()=>{
    return(
        <>
            <div className="flex items-center justify-center
            ">
                <MenuManageButton label={'TreeList'}/>
            </div>
            <div className="flex items-center justify-center">
                <MenuManageButton label={'Control'}/>
            </div>
            <div className="flex items-center justify-center">
                <MenuManageButton label={'Detail'}/>
            </div>
            <div className='flex items-center justify-center'>
                <MenuManageButton label={'SimpleControl'}/>
            </div>
        </>
    )
}
export default MenuManager