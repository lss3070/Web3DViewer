import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import ModalSetting from "../../components/modal/modal-info";
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import Portal from "../../HOC/portal";


const SettingManager=()=>{
    const [isSetting,setIsSetting]=useState<boolean>(false);

    const closeSetting=()=>{
        setIsSetting(false);
    }

    
    const gitOpen=()=>{
        window.open(process.env.NEXT_PUBLIC_GIT_URL,'_blank')?.focus()
    }
    
    return(
        <div className="flex space-x-3 mr-3">
            {/* <div className='flex items-center justify-center'>
                <FontAwesomeIcon
                    onClick={openGithub}
                    icon={['fab','github']}
                    size='lg'
                    className="cursor-pointer 
                        hover:text-blue-500
                    "    
                />
            </div> */}
            <div className='flex items-center justify-center'>
                <FontAwesomeIcon
                    onClick={gitOpen}
                    icon={faGithub}
                    className=" w-5 h-5 cursor-pointer"/>
                {/* <FontAwesomeIcon
                    onClick={openSetting}
                    icon={faCircleInfo}
                    size="lg"
                    className="cursor-pointer 
                    hover:text-blue-500"/> */}
            </div>
            <Portal> 
                <AnimatePresence>
                    {isSetting&&( <ModalSetting onClose={closeSetting}/>)}
                </AnimatePresence>
            </Portal>
        </div>
    )
}

export default SettingManager;