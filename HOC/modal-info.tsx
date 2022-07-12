import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { motion } from "framer-motion"

interface IInfoProps{
    onClose:()=>void;
}
const ModalInfo=({onClose}:IInfoProps)=>{
    return(
        <motion.div>
            <div>
                eee
            </div>
        </motion.div>
    )
}

export default ModalInfo

//상단박스에 github icon,send email,
//중단에 언어