import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion"

interface IRemocornTabBox{
    label:string;
    id:string;
    openId?:string;
    setOpenId:Function;
    children:JSX.Element
}

const RemocornTabBox=({label,id,openId,setOpenId,children}:IRemocornTabBox)=>{

    const toggleOpen = () => {
        id===openId?setOpenId(''):setOpenId(id);
    }

    return(
        <motion.li
        key={id}
        className="
        bg-[#f7fafb]
        text-gray-600
        dark:bg-gray-400 
        dark:border-transparent
        font-bold
        grid
        rounded-lg
         shadow-md
         border
         border-gray-100
        "
        transition={{
            layout:{
                duration:1,
                type:'spring'
            }
        }}
        style={{transition:`opacity 0.5s ease-in-out`}}
        >
            <div className="rounded-lg 
              h-auto px-4 ">
                <div className='flex items-center justify-center h-10 '>
                <div className=' w-full'>{label}</div>
                <div className=' w-full flex justify-end cursor-pointer'
                  onClick={toggleOpen} 
                >
                    {
                        openId===id?(
                            <FontAwesomeIcon
                            icon={['fas','angle-up']}
                            className="w-5 h-5 "/>
                        )
                        :
                        (<FontAwesomeIcon
                            icon={['fas','angle-down']}
                            className="w-5 h-5 "/>)
                    }
                </div>
            </div>
                
             </div>
             <AnimatePresence initial={false} >
                    {openId===id && children}
                </AnimatePresence>
        </motion.li>
    )
}

export default RemocornTabBox