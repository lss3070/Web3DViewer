import {motion,AnimatePresence,LayoutGroup, DragControls} from 'framer-motion'
import { memo, ReactElement, useState } from 'react';
import Tab from './tab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface TabCategoryProps{
    label:string;
    id:number;
    tabList:TabItem[];
    openId?:number;
    setOpenId:Function;
}
export interface TabItem{
    label:string;
    index:number;
    content:JSX.Element;
}

const Category=({
    label,
    id,
    tabList,
    openId,
    setOpenId}:TabCategoryProps)=>{

    const toggleOpen = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {

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
        className="bg-gray-400 grid
        "
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
                    {openId===id && <Tab tabList={tabList}/>}
                </AnimatePresence>
        </motion.li>
    )
}
export default Category