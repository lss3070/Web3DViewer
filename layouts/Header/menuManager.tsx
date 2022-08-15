import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MiniButton from '../../components/common/mini-button';
import { useEffect } from 'react';
import useMenuStore from '../../store/menu.store';


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
                    icon={['fas','folder-tree']} 
                    className="w-5 h-5 "/>
                <span>TreeList</span>
            </>
        </MiniButton>
        <MiniButton 
        onClick={onControlClick} 
        pressState={onControl}>
            <>
                <FontAwesomeIcon
                    icon={['fas','screwdriver-wrench']} 
                    className="w-5 h-5 "/>
                <span>Control</span>
            </>
        </MiniButton>
        <MiniButton 
        onClick={onSimpleControlClick} 
        pressState={onMiniControl}>
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