import { is } from "@react-three/fiber/dist/declarations/src/core/utils";
import { motion } from "framer-motion";
import { isArray } from "lodash";
import { useEffect, useId, useState } from "react";



//  export interface IRemocornTabItem{
//     label:string;
//     index:number;
//     content:JSX.Element;
// }

interface IRemocornTabProps{

    children?:JSX.Element[]|JSX.Element;
}

const RemocornTab=({children}:IRemocornTabProps)=>{

    // const [itemList,setItemList]=useState<IRemocornTabItem[]>();
    
    const id =useId();
    const [index,setIndex]=useState<number>(0)

    // useEffect(()=>{
    //     if(isArray(children)){
    //        const list= children.map((item,index)=>{
    //             return {
    //                 label:item.props.label,
    //                 index,
    //                 content:item
    //             }
    //         })
    //         setItemList(list);
    //     }
    // },[children])

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
            {isArray(children)&&
            <motion.nav className='h-9'>
                <ul className='flex w-full'>
                {children?.map((item,i)=>{
                    return(
                        <li
                        className={
                            `w-full cursor-pointer flex items-center justify-center
                            select-none relative`
                        }
                            key={id}
                            onClick={() => setIndex(i)}
                            >
                            {`${item.props.label}`}
                            {i === index ? (
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
                         duration: 0.2 }}>
                        {isArray(children)?children[index]:children}
                    </motion.div>
            </motion.main>
        </motion.div>
      );
}

export default RemocornTab;