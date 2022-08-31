import { useAnimations } from "@react-three/drei";
import { AnimationClip, AnimationMixer } from "three";
import { Helper } from "../../../global/interfaces/app.interface"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import useMeshStore from "../../../store/mesh.store";
import useAnimationStore from '../../../store/animation.store';
import { useId } from "react";


const CustomAniHelper=({}:Helper)=>{
    
    const selectMesh = useMeshStore((state)=>state.selectMesh)
    const id =useId();

    const [animationList,
        customAnimation,
        setCustomAnimation]=useAnimationStore((state)=>[
            state.customAnimationList,
            state.customAnimation,
            state.setCustomAnimation])


    const toggleClick=(name:string)=>{
        if(customAnimation?.cur===''){
            setCustomAnimation({
                pre:'',
                cur:name
            })
        }else{
            customAnimation?.cur===name?setCustomAnimation({
                pre:name,
                cur:''
            }):
            setCustomAnimation({
                pre:customAnimation?.cur!,
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
                animationList?.map((item:AnimationClip,index)=>{
                  return  (
                    <div className="grid grid-cols-11" key={index} >
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
                                {customAnimation?.cur===item.name?
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
                )
                })
            }

        </div>
    )
}
export default CustomAniHelper