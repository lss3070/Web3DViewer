import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {AnimatePresence, motion} from 'framer-motion'
import { useEffect, useState } from 'react';
import ModalSetting from '../HOC/modal-setting';
import Portal from '../HOC/portal';
import { useMenuSWR } from '../swrs/menu.swr';
import MiniButton from './mini-button';


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