import { motion } from "framer-motion";
import { useEffect, useState } from "react";


 export interface IRemocornTabItem{
    label:string;
    index:number;
    content:JSX.Element;
}

interface IRemocornTabProps{
    tabList:IRemocornTabItem[]
}

const RemocornTab=({tabList}:IRemocornTabProps)=>{

    const [itemList,setItemList]=useState<IRemocornTabItem[]>();

    const [selectedTab, setSelectedTab] = useState<IRemocornTabItem>(tabList[0]);
    
    useEffect(()=>{
        setItemList([...tabList]);
    },[tabList])

    return (
        <motion.div
        className=' 
        h-full rounded-b-md px-2 font-normal
        bg-white
        dark:bg-slate-400 '
        onClick={(e)=>{
            e.stopPropagation()
        }}
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
        >
            {tabList.length>0&&
            <motion.nav className='h-9'>
                <ul className='flex w-full'>
                {itemList?.map((item)=>{
                    return(
                        <li
                        className={
                            `w-full cursor-pointer flex items-center justify-center
                            select-none relative`
                        }
                            key={item.index}
                            onClick={() => setSelectedTab(item)}
                            >
                            {`${item.label}`}
                            {item.index === selectedTab?.index ? (
                                <motion.div 
                              style={{bottom:'-1px'}}
                                className="
                                 absolute left-0 right-0 bg-gray-500 bottom-0
                                 h-1
                                " layoutId="underline" />
                            ) : null}
                        </li>
                    )
                })}
                </ul>
            </motion.nav>
            }
            <motion.main className=' items-center justify-center'>
                    <motion.div
                    layout
                     transition={{ 
                         duration: 0.2 }}
                    >
                        {selectedTab?.content!}
                    </motion.div>
            </motion.main>
        </motion.div>
      );
}

export default RemocornTab;