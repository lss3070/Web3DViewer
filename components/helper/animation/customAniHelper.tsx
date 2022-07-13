import { useAnimations } from "@react-three/drei";
import { AnimationClip, AnimationMixer } from "three";
import { Helper } from "../../../interfaces/app.interface"
import { useCommonSWR } from '../../../swrs/common.swr';
import { useMeshSWR } from '../../../swrs/mesh.swr';


const CustomAniHelper=({}:Helper)=>{
const {meshState}=useMeshSWR()
const {commonState}=useCommonSWR()

    const Start=(name:string)=>{

        const mixer= new AnimationMixer(commonState?.scene?.current?.children![8]!);
        // const mixer= new AnimationMixer(commonState?.scene?.current!);
        
        const clip= AnimationClip.findByName(meshState?.animationList!,name);


        console.log(mixer);
        console.log(clip);
        const action= mixer.clipAction(clip);
        action.play();
    }
    return(
        <div>
            {
                meshState?.animationList?.map((item:AnimationClip)=>{
                  return  <div onClick={()=>Start(item.name)}>
                      {item.name}</div>
                })
            }

        </div>
    )
}
export default CustomAniHelper