import { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCommonSWR } from '../swrs/common.swr';

const DarkModeSwitch=()=>{

    // const [isOn,setIsOn]=useState<boolean>(false);

    const {commonState,setDarkMode}=useCommonSWR()
    const toggleSwitch = () => setDarkMode(!commonState?.darkMode!)
    
    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    }

    useEffect(()=>{
        if (commonState?.darkMode) {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
          } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
          }
      
          if (
              localStorage.theme === 'light' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)
            ) { 
                document.documentElement.classList.add('dark') } 
            else {
              document.documentElement.classList.remove('dark')
          }
    },[commonState?.darkMode]);

 
    return(
      <div onClick={toggleSwitch} className={`flex-start flex h-[30px] w-[50px] rounded-[50px] 
      bg-[#ededed] p-[5px] shadow-inner hover:cursor-pointer 
      dark:bg-zinc-600 
      ${ commonState?.darkMode && 'place-content-end'}`}>
            <motion.div
                className="flex h-[20px] 
                w-[20px] items-center justify-center rounded-full 
                bg-white
                dark:bg-zinc-900 
               "
                
                layout
                transition={spring}
            >
                <motion.div whileTap={{rotate: 360}}>
                    {commonState?.darkMode? 
                    (<FontAwesomeIcon
                        icon={['fas','moon']}
                        className="w-5 h-5 text-yellow-200"/>
                    ):
                    (<FontAwesomeIcon
                        icon={['fas','sun']}
                        className="w-5 h-5 text-[black]"/>
                        )
                    }
                </motion.div>
            </motion.div>      
        </div>
    )
}
export default DarkModeSwitch;