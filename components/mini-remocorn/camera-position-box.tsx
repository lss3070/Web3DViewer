import { useCameraSWR } from "../../swrs/camera.swr"
import Front from '../../assets/cube-front.svg'
import Back from '../../assets/cube-back.svg'
import Left from '../../assets/cube-left.svg'
import Right from '../../assets/cube-right.svg'
import Top from '../../assets/cube-top.svg'
import Bottom from '../../assets/cube-down.svg'
import { Vector3 } from "three"
import { motion } from "framer-motion"

export enum CustomCameraFocus{
    Front,Back,Left,Right,Top,Bottom
}
interface BoxProps{
    type:CustomCameraFocus
}

const CameraPositionBox:React.FC<BoxProps> =({type})=>{

    const {cameraState,setTarget,setPosition}=useCameraSWR()
    const switchBox=()=>{
        switch(type){
            case CustomCameraFocus.Front:
                return <Front/>
            case CustomCameraFocus.Back:
                return <Back/>
            case CustomCameraFocus.Left:
                return <Left/>
            case CustomCameraFocus.Right:
                return <Right/>
            case CustomCameraFocus.Top:
                return <Top/>
            case CustomCameraFocus.Bottom:
                return <Bottom/>
        }    
    }

    const onClick=()=>{
        setTarget(new Vector3(0,0,0));
        
        switch(type){
            case CustomCameraFocus.Front:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                0,0,cameraState?.meshBox.max.z!*2
                                ))
                break;
            case CustomCameraFocus.Back:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                0,0,cameraState?.meshBox.min.z!*2
                                ))
                break;
            case CustomCameraFocus.Left:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                    cameraState?.meshBox.max.x!*2,
                                0,0
                                ))
                break;
            case CustomCameraFocus.Right:
                cameraState?.camera?.current.up.set(0,1,0)
                setPosition(new Vector3(
                                    cameraState?.meshBox.min.x!*2,
                                0,0
                                ))
                break;
            case CustomCameraFocus.Top:
                cameraState?.camera?.current.up.set(0,0,1)
                setPosition(new Vector3(
                                    0,cameraState?.meshBox.max.y!*4,0
                                    ))
                break;
            case CustomCameraFocus.Bottom:
                cameraState?.camera?.current.up.set(0,0,1)
                setPosition(new Vector3(
                                    0,cameraState?.meshBox.min.y!*4,0
                                    ))
                break;
        }    
    }
    return  (
    <motion.div 
    whileHover={{scale:1.2,backgroundColor:'#ffffff'}}
    whileTap={{ backgroundColor:'#bdbdbd' }}
    className='w-8 h-8 p-1 cursor-pointer rounded-full 
    z-10 
    dark:bg-gray-400
    bg-[#edf1f5]
    shadow-lg
    '
    onClick={onClick}
    >
        {switchBox()}
    </motion.div>)
}
export default CameraPositionBox;