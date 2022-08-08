import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"
import DarkBackGround from "./dark-background"

interface IInfoProps{
    onClose:()=>void;
}
const ModalSetting=({onClose}:IInfoProps)=>{

    const variants={
        down:{
            // height:'auto',
            top:'30%',
            // rotate: [0, -30, 0], 
            transition: { duration: 0.5 }
        },
        up:{
            top:'-10%',
            // height:0,
        }
    }

    return(


        <DarkBackGround onClick={onClose}>
            <motion.div
            style={{gap:'10px',padding:'10px 10px',left:'50%'}} 
            className={`
            absolute
            translate-x-[-50%]
            rounded-md
            overflow-hidden
            grid
            z-[99]
            border 
            border-red-100
            text-gray-600
            bg-[#f7fafb]
            dark:text-white
            dark:bg-[#64758b]
            dark:border-transparent
            shadow-2xl
            gap-3
            `}
            animate={'down'}
            variants={variants}
            exit={'up'}
            onClick={(e)=>e.stopPropagation()}
            >
                <div className=" w-56 px-2">
                    <div className=" grid grid-cols-6 items-center justify-center ">
                    <FontAwesomeIcon
                    icon={['fas','envelope']}
                    className="w-5 h-5  "/>
                       
                        <div className=" text-right">songseop.tech@gmail.com</div>
                    </div>
                    <div className=" grid grid-cols-6 items-center justify-center">
                    <FontAwesomeIcon
                    icon={['fab','github']}
                    className=" w-5 h-5"/>
                        <div className="text-right">
                            https://github.com/lss3070
                        </div>

                    </div>
                </div>
                
            </motion.div>
        </DarkBackGround>

    )
}

export default ModalSetting

//상단박스에 github icon,send email,
//중단에 언어