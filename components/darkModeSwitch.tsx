import { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useTheme} from 'next-themes'
import {faSun,faMoon} from '@fortawesome/free-solid-svg-icons'

const DarkModeSwitch=()=>{

    // const [isOn,setIsOn]=useState<boolean>(false);
    const {theme,setTheme}=useTheme()

    const [darkMode,setDarkMode]=useState<boolean>();

    const toggleSwitch = () => {        
        setTheme(theme==='dark'?"light":"dark")
    }
    
    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    }
    useEffect(()=>{
        setDarkMode(theme==='dark'?true:false)
    },[])

    useEffect(()=>{
        setDarkMode(theme==='dark'?true:false)
    },[theme])
 
    return(
        <div className='shadow-lg rounded-[50px] h-[30px] w-[50px]'>
            <div onClick={toggleSwitch} className={`
            flex-start flex rounded-[50px] 
            bg-[#f7fafb] p-[5px] shadow-inner hover:cursor-pointer 
            dark:bg-zinc-600 
            border 
            border-gray-100 
            dark:border-transparent
            ${ darkMode&& 'place-content-end'}`}>
                <motion.div
                    className="flex h-[20px] 
                    w-[20px] items-center justify-center rounded-full 
                    bg-white
                    dark:bg-zinc-900 
                "
                    layout
                    transition={spring}
                >
                    <motion.div whileTap={{rotate: 360}} className="shadow-lg rounded-full">
                        {darkMode? 
                        (<FontAwesomeIcon
                            icon={faMoon}
                            size='1x'
                            className="text-yellow-200"/>
                        ):
                        (<FontAwesomeIcon
                            icon={faSun}
                            size='1x'
                            className="text-orange-300"/>
                            )
                        }
                    </motion.div>
                </motion.div>      
            </div>
        </div>    


    )
}
export default DarkModeSwitch;