import { Col, Row, Slider } from "antd"
import { ChangeEvent } from "react";
import { Vector3 } from "three";
import { Helper } from "../../../global/interfaces/app.interface";
import SliderItem from "../common/sliderItem";
import useCameraStore from '../../../store/camera.store';



export const PositionMoveHelper=({}:Helper)=>{
 

    const [
        position,setPosition]=useCameraStore((state)=>[
        state.position,
        state.setPosition
    ])
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
            value={position.x!}
            sliderChangeEvent={
                (e:number)=>PositionMoveEvent(e,position.y,position.z)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                PositionMoveEvent(+e.target.value,position.y,position.z)
            }
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={position.y}
            sliderChangeEvent={
                (e:number)=>PositionMoveEvent(position.x,e,position.z)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                PositionMoveEvent(position.x,+e.target.value,position.z)
            }
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={position.z}
            sliderChangeEvent={
                (e:number)=>PositionMoveEvent(position.x,position.y,e)
            }
            inputChangeEvent={
                (e:ChangeEvent<HTMLInputElement>)=>
                PositionMoveEvent(position.x,position.y,+e.target.value)
            }
            />
        </div>
    )
}