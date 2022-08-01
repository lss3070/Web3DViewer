import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMenuSWR } from '../../swrs/menu.swr';
import MiniButton from '../../components/common/mini-button';
import { useEffect } from 'react';


const MenuManager=()=>{
    const {menuState,onControl,onTreeList,onSimpleControl}= useMenuSWR();

    useEffect(()=>{

    },[menuState?.treeList.on]);
    useEffect(()=>{

    },[menuState?.control.on]);
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
        <>
        <MiniButton 
        onClick={onTreeClick} 
        pressState={menuState?.treeList.on}>
            <>
                <FontAwesomeIcon
                    icon={['fas','folder-tree']} 
                    className="w-5 h-5 "/>
                <span>TreeList</span>
            </>
        </MiniButton>
        <MiniButton 
        onClick={onControlClick} 
        pressState={menuState?.control.on}>
            <>
                <FontAwesomeIcon
                    icon={['fas','screwdriver-wrench']} 
                    className="w-5 h-5 "/>
                <span>Control</span>
            </>
        </MiniButton>
        <MiniButton 
        onClick={onSimpleControlClick} 
        pressState={menuState?.simpleControl.on}>
            <>
                <FontAwesomeIcon
                    icon={['fas','wrench']} 
                    className="w-5 h-5 "/>
                <span>SimpleControl</span>
            </>
        </MiniButton>
        </>
    )
}
export default MenuManager