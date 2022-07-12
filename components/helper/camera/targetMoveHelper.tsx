import { Col, Row, Slider } from "antd"
import { ChangeEvent } from "react";
import { Vector3 } from "three";
import { Helper } from "../../../interfaces/app.interface";
import { useCameraSWR } from "../../../swrs/camera.swr";
import SliderItem from "../../sliderItem";

export const TargetMoveHelper=({}:Helper)=>{
    const {cameraState,setTarget}=useCameraSWR();
    
    const TargetChangeEvent=(x:number,y:number,z:number)=>{
        setTarget(new Vector3(x,y,z));
    } 
    
    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={cameraState?.position?.x!}
            sliderChangeEvent={
                (e:number)=>TargetChangeEvent(e,cameraState?.target?.y!,cameraState?.target?.z!)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                TargetChangeEvent(+e.target.value,cameraState?.target?.y!,cameraState?.target?.z!)
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={cameraState?.position?.y!}
            sliderChangeEvent={
                (e:number)=>TargetChangeEvent(cameraState?.target?.x!,e,cameraState?.target?.z!)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                TargetChangeEvent(cameraState?.target?.x!,+e.target.value,cameraState?.target?.z!)
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={cameraState?.position?.z!}
            sliderChangeEvent={
                (e:number)=>TargetChangeEvent(cameraState?.target?.x!,cameraState?.target?.y!,e)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                TargetChangeEvent(cameraState?.target?.x!,cameraState?.target?.y!,+e.target.value)
            }
            />
        </div>
    )
}