import { useState, useEffect } from 'react';
import {motion} from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useDarkStore from '../store/dark.store';

const DarkModeSwitch=()=>{

    // const [isOn,setIsOn]=useState<boolean>(false);

    const [darkMode,setDarkMode]=useDarkStore((state)=>[
        state.darkMode,
        state.setDarkMode
    ])
    const toggleSwitch = () => setDarkMode(!darkMode)
    
    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    }

    useEffect(()=>{
        if(localStorage.getItem('theme')==='dark'){
            setDarkMode(false);
        }else{
            setDarkMode(true);
        }
    },[])

    useEffect(()=>{
        if (darkMode) {
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
    },[darkMode]);

 
    return(
        <div className='shadow-lg rounded-[50px] h-[30px] w-[50px]'>
            <div onClick={toggleSwitch} className={`
            flex-start flex rounded-[50px] 
            bg-[#f7fafb] p-[5px] shadow-inner hover:cursor-pointer 
            dark:bg-zinc-600 
            border 
            border-gray-100 
            dark:border-transparent
            ${ darkMode && 'place-content-end'}`}>
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
                            icon={['fas','moon']}
                            className="w-5 h-5 text-yellow-200"/>
                        ):
                        (<FontAwesomeIcon
                            icon={['fas','sun']}
                            className="w-5 h-5 text-orange-300"/>
                            )
                        }
                    </motion.div>
                </motion.div>      
            </div>
        </div>    


    )
}
export default DarkModeSwitch;