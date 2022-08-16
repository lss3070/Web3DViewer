import { useThree } from "@react-three/fiber";
import { Col, Row, Slider } from "antd"
import { ChangeEvent } from "react";
import { Vector3 } from "three";
import { TrackballControls } from "three-stdlib";
import { Helper } from "../../../global/interfaces/app.interface";
import useCameraStore from "../../../store/camera.store";
import SliderItem from "../common/sliderItem";

export const TargetMoveHelper=({}:Helper)=>{

    const [
        target,setTarget
    ] = useCameraStore((state)=>[
        state.target,
        state.setTarget
    ]);
    
    const TargetChangeEvent=(x:number,y:number,z:number)=>{
        setTarget(new Vector3(x,y,z));
    }


    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={target.x}
            sliderChangeEvent={
                (e:number)=>TargetChangeEvent(e,target.y,target.z)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                TargetChangeEvent(+e.target.value,target.y,target.z)
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={target.y}
            sliderChangeEvent={
                (e:number)=>TargetChangeEvent(target.x,e,target.z)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                TargetChangeEvent(target.x,+e.target.value,target.z)
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={target.z}
            sliderChangeEvent={
                (e:number)=>TargetChangeEvent(target.x,target.y,e)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                TargetChangeEvent(target.x,target.y,+e.target.value)
            }
            />
        </div>
    )
}