import { useAnimations } from "@react-three/drei";
import { AnimationClip, AnimationMixer } from "three";
import { Helper } from "../../../interfaces/app.interface"
import { useCommonSWR } from '../../../swrs/common.swr';
import { useMeshSWR } from '../../../swrs/mesh.swr';
import { useAnimationSWR } from '../../../swrs/animation.swr';


const CustomAniHelper=({}:Helper)=>{
const {meshState}=useMeshSWR()
const {commonState}=useCommonSWR()
const {animationState,setCustomAnimation}=useAnimationSWR()


    const toggleClick=(name:string)=>{
        const value= animationState?.customAnimation===name?
        '':name
        setCustomAnimation(value);
    }

    return(
        <div>
            {
                meshState?.animationList?.map((item:AnimationClip)=>{
                  return  <div onClick={()=>toggleClick(item.name)}>
                      {item.name}</div>
                })
            }

        </div>
    )
}
export default CustomAniHelper