import {motion} from 'framer-motion'


const MenuManager=()=>{
    return(
        <>
            <div className="flex items-center justify-center
            ">
                <motion.div 
                animate={{boxShadow:'0px 0px  rgba(0, 0, 0, 0.2)'}}
                whileHover={{boxShadow:'3px 3px  rgba(0, 0, 0, 0.2)'}}
                className=" rounded-md py-1 px-2 bg-[#64758b]
                text-white 
                shadow-inner shadow-[#38485e] 
                cursor-pointer
                ">TreeList</motion.div>
            </div>
            <div className="flex items-center justify-center">Control</div>
            <div className="flex items-center justify-center">Detail</div>
        </>
    )
}
export default MenuManager