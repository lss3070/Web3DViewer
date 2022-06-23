import {motion,AnimatePresence,LayoutGroup} from 'framer-motion'
import { memo, ReactElement, useState } from 'react';
import Tab from './tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TabCategoryProps{
    label:string;
    id:number;
    children:JSX.Element;
    openId?:number;
    setOpenId:Function;
}


const SingleCategory=({label,id,children,openId,setOpenId}:TabCategoryProps)=>{

    const toggleOpen = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
console.log(openId);
console.log(id);
        id===openId?setOpenId():setOpenId(id);
    }

    return(
        <motion.li
        key={id}
        transition={{
            layout:{
                duration:1,
                type:'spring'
            }
        }}
        style={{transition:`opacity 0.5s ease-in-out`}}
        className=" bg-gray-400 grid"
        initial={{ borderRadius: 10 }}>
            <div className='flex items-center justify-center h-9 px-2'>
                <div className=' w-full text-white'>{label}</div>
                <div className=' w-full flex justify-end cursor-pointer'
                  onClick={toggleOpen} 
                >
                    {
                        openId===id?(
                            <FontAwesomeIcon
                            icon={['fas','angle-up']}
                            className="w-5 h-5 text-white"/>
                        )
                        :
                        (<FontAwesomeIcon
                            icon={['fas','angle-down']}
                            className="w-5 h-5 text-white"/>)
                    }
                </div>
            </div>
                <AnimatePresence initial={false} >
                    {openId===id &&
                      <motion.div
                      key="content"
                      initial='collapsed'
                      animate="open"
                      exit="collapsed"
                      variants={{
                          open: { opacity: 1, height: `auto` },
                          collapsed: { opacity: 0, height: 0 },
                          layout:{}
                      }}
                      transition={{
                        duration:0.5,
                         ease: [0.04, 0.62, 0.23, 0.98] }}
                        className='bg-slate-400 h-full rounded-b-md px-2'>
                        {children}
                      </motion.div>
                    }
                </AnimatePresence>
        </motion.li>
    )
}
export default SingleCategory