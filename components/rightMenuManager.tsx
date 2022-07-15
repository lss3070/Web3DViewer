import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ModalSetting from "../HOC/modal-setting";
import Portal from "../HOC/portal";


const RightMenuManager=()=>{
    const [isSetting,setIsSetting]=useState<boolean>(false);

    const openSetting=()=>{
        setIsSetting(true);
    }
    const closeSetting=()=>{
        setIsSetting(false);
    }
    
    const openGithub=()=>{
        window.open('https://github.com/lss3070/react-three-viewer',
        )
    }
    
    return(
        <div className="flex gap-3">
            <div className='flex items-center justify-center'>
                <FontAwesomeIcon
                    onClick={openGithub}
                    icon={['fab','github']}
                    size='lg'
                    className="cursor-pointer 
                        hover:text-blue-500
                    "    
                />
            </div>
            <div className='flex items-center justify-center'>
                <FontAwesomeIcon
                    onClick={openSetting}
                    icon={['fas','gear']}
                    size="lg"
                    className="cursor-pointer 
                    hover:text-blue-500"/>
            </div>
            <Portal> 
                <AnimatePresence>
                    {isSetting&&( <ModalSetting onClose={closeSetting}/>)}
                </AnimatePresence>
            </Portal>
        </div>
    )
}

export default RightMenuManager;