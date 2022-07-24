import { useAnimations } from "@react-three/drei";
import { AnimationClip, AnimationMixer } from "three";
import { Helper } from "../../../interfaces/app.interface"
import { useCommonSWR } from '../../../swrs/common.swr';
import { useMeshSWR } from '../../../swrs/mesh.swr';
import { useAnimationSWR } from '../../../swrs/animation.swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";


const CustomAniHelper=({}:Helper)=>{
const {meshState}=useMeshSWR()
const {animationState,setCustomAnimation}=useAnimationSWR()


    const toggleClick=(name:string)=>{

        if(animationState?.customAnimation?.cur===''){
            setCustomAnimation({
                pre:'',
                cur:name
            })
        }else{
            animationState?.customAnimation?.cur===name?setCustomAnimation({
                pre:name,
                cur:''
            }):
            setCustomAnimation({
                pre:animationState?.customAnimation?.cur!,
                cur:name
            })
        }
        // const value= animationState?.customAnimation===name?
        // '':name
        // setCustomAnimation(value);
    }

    return(
        <div>
            {
                meshState?.animationList?.map((item:AnimationClip)=>{
                  return  <div className="grid grid-cols-11"
                  >
                        <div className=" select-none col-span-10">{item.name}</div>
                        <div  
                        className="flex w-full  col-span-1   justify-end items-end "
                        onClick={()=>toggleClick(item.name)}>
                            <motion.div 
                            animate
                            transition={{
                                ease:'easeInOut'
                            }}
                            // whileTap={{rotate: 360}}  
                            onClick={()=>toggleClick(item.name)}>
                                {animationState?.customAnimation?.cur===item.name?
                                (<FontAwesomeIcon
                                    icon={['fas','stop']}
                                    className="w-5 h-5 text-gray-600 cursor-pointer"/>
                                ):
                                (<FontAwesomeIcon
                                    icon={['fas','play']}
                                    className="w-5 h-5 text-gray-600 cursor-pointer"/>)
                                }
                            </motion.div>
                        </div>
                      
                      </div>
                })
            }

        </div>
    )
}
export default CustomAniHelper