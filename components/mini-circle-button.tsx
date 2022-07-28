import { motion } from "framer-motion";
import { MouseEventHandler, useState } from "react";
import { useMeshSWR } from "../swrs/mesh.swr";

interface MiniCircleButtonProps{
    label: JSX.Element|string,
    onClick?:MouseEventHandler<HTMLDivElement> ;
}


const MiniCircleButton:React.FC<MiniCircleButtonProps>=({label,onClick})=>{

    const [onDown,setOnDown]=useState<boolean>(false);
    const [onSelect,setOnSelect]=useState<boolean>(false);

    // const OnActive=()=>{
    //     switch(label){
    //         case'Text':
    //             setOnText(!meshState?.onText!);
    //             setOnSelect(!meshState?.onText!)
    //         break;
    //         case'Wire':
    //             setOnWire(!meshState?.onWire!);
    //             setOnSelect(!meshState?.onWire!)
    //         break;
    //         default:
    //             // setOnSelect(!onSelect)
    //     }
    // }

    // useEffect(()=>{
    //     switch(label){
    //         case 'Text':
    //             setOnText(meshState?.onText!);
    //             setOnSelect(meshState?.onText!)
    //             break;
    //         case 'Wire':
    //             setOnText(meshState?.onWire!);
    //             setOnSelect(meshState?.onWire!)
    //             break
    //     }
    // },[label])

    const onMouseDown=()=>{
            setOnDown(true);
            // OnActive();
    }

    const onMouseUp=()=>{
        setOnDown(false)
    }

    return(
        <div className='rounded-full shadow-md'>
            <motion.div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            animate={{boxShadow:`${onSelect?`inset 1px 3px 1px rgba(0, 0, 0, 0.2)`
            :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}`}}
            whileTap={{boxShadow:`
            ${onDown?`inset 1px 5px 1px rgba(0, 0, 0, 0.2)`:
            onSelect?`inset 1px 3px 1px rgba(0, 0, 0, 0.2)`
            :`inset 0px 0px 0px rgba(0, 0, 0, 0.2)`}
            `}}
            onClick={onClick}
            // whileHover={{boxShadow:`${!onSelect?`3px 3px rgba(0, 0, 0, 0.2)`
            // :`inset 3px 5px rgba(0, 0, 0, 0.2)`}`}}
            className='w-8 h-8 
            dark:bg-gray-400
            bg-[#edf1f5]
            rounded-full flex 
            items-center justify-center 
            font-semibold cursor-pointer 
                '>
                        {label}
            </motion.div>
        </div>
    )
}

export default MiniCircleButton