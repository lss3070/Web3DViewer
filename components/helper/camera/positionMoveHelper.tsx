import { Col, Row, Slider } from "antd"
import { ChangeEvent } from "react";
import { Vector3 } from "three";
import { Helper } from "../../../global/interfaces/app.interface";
import { useCameraSWR } from "../../../swrs/camera.swr";
import SliderItem from "../../sliderItem";



export const PositionMoveHelper=({}:Helper)=>{
    const {cameraState,setPosition}=useCameraSWR();
    const PositionMoveEvent=(x:number,y:number,z:number)=>{
        x = isNaN(x)?0:x;
        y = isNaN(y)?0:y;
        z = isNaN(z)?0:z;
        setPosition(new Vector3(x,y,z));
    }


    return(
        <div className="w-full">
             <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={cameraState?.position?.x!}
            sliderChangeEvent={
                (e:number)=>PositionMoveEvent(e,cameraState?.position.y!,cameraState?.position.z!)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                PositionMoveEvent(+e.target.value,cameraState?.position?.y!,cameraState?.position?.z!)
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={cameraState?.position?.y!}
            sliderChangeEvent={
                (e:number)=>PositionMoveEvent(cameraState?.position.x!,e,cameraState?.position.z!)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                PositionMoveEvent(cameraState?.position?.x!,+e.target.value,cameraState?.position?.z!)
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={cameraState?.position?.z!}
            sliderChangeEvent={
                (e:number)=>PositionMoveEvent(cameraState?.position.x!,cameraState?.position.y!,e)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                PositionMoveEvent(cameraState?.position?.x!,cameraState?.position?.y!,+e.target.value)
            }
            />
        </div>
    )
}