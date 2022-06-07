import {motion,AnimatePresence,LayoutGroup} from 'framer-motion'
import { memo, ReactElement, useState } from 'react';
import Tab from './tab';

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

const Category=({label,id,tabList,openId,setOpenId}:TabCategoryProps)=>{

    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        id===openId?setOpenId():setOpenId(id);
    }

    return(
        <motion.li
        transition={{
            layout:{
                duration:1,
                type:'spring'
            }
        }}
        style={{transition:`opacity 0.5s ease-in-out`}}
        className="border bg-gray-400 grid"
        initial={{ borderRadius: 10 }}>
            <div className='flex items-center justify-center h-9'>
                <div className=' w-full'>{label}</div>
                <div className=' w-full flex justify-end mr-4 cursor-pointer'
                  onClick={toggleOpen} 
                >
                    V
                </div>
            </div>
                <AnimatePresence initial={false} >
                    {openId===id && <Tab tabList={tabList}/>}
                </AnimatePresence>
        </motion.li>
    )
}
export default Category