import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MiniButton from '../../components/common/mini-button';
import { useEffect } from 'react';
import useMenuStore from '../../store/menu.store';

import {faFolderTree,faScrewdriverWrench,faWrench} from '@fortawesome/free-solid-svg-icons'


const MenuManager=()=>{

    const [
        onTree,
        onControl,
        onMiniControl,
        toggleControl,
        toggleTree,
        toggleMiniControl
    ] = useMenuStore((state)=>[
        state.onTree,
        state.onControl,
        state.onMiniControl,
        state.toggleControl,
        state.toggleTree,
        state.toggleMiniControl
    ])


    const onTreeClick=()=>{
        toggleTree()
    }
    const onControlClick=()=>{
        toggleControl()
    }
    const onSimpleControlClick=()=>{
        toggleMiniControl()
    }

    return(
        <>
        <MiniButton 
        onClick={onTreeClick} 
        pressState={onTree}>
            <>
                <FontAwesomeIcon
                    icon={faFolderTree} 
                    size='lg'
                    className="mr-1 "/>
                <span>TreeList</span>
            </>
        </MiniButton>
        <MiniButton 
        onClick={onControlClick} 
        pressState={onControl}>
            <>
                <FontAwesomeIcon
                    icon={faScrewdriverWrench} 
                    size='lg'
                    className="mr-1"/>
                <span>Control</span>
            </>
        </MiniButton>
        <MiniButton 
        onClick={onSimpleControlClick} 
        pressState={onMiniControl}>
            <>
                <FontAwesomeIcon
                    icon={faWrench} 
                    size='lg'
                    className="mr-1"/>
                <span>SimpleControl</span>
            </>
        </MiniButton>
        </>
    )
}
export default MenuManager