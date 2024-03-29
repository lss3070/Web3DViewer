import { Col, Row, Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useEffect, useState } from "react";
import { Euler, Vector3 } from "three";
import { Helper } from "../../../global/interfaces/app.interface";
import useMeshStore, { useSelectMehsStore } from "../../../store/mesh.store";
import SliderItem from "../common/sliderItem";

interface IRotationHelper extends Helper{
    // rotation:Euler;
    // rotationAxis:Vector3;
    // setRotation:Function;
}

export const RotationHelper=({}:IRotationHelper)=>{

    const selectMesh =useSelectMehsStore((state)=>state.selectMesh)
    const [rotation,setRotation]=useState<Euler>(new Euler());
    
    const InitRosition=()=>{
        if(selectMesh){
            setRotation(selectMesh.current.rotation)
        }
    }

    

    const setX=(e:number)=>{
        e = isNaN(e)?0:e;
        if(selectMesh){
            selectMesh.current.rotation.x=e
        }
        setRotation(new Euler(e,rotation.y,rotation.z))
    }
    const setY=(e:number)=>{
        e = isNaN(e)?0:e;
        if(selectMesh){
            selectMesh.current.rotation.y=e
        }
        setRotation(new Euler(rotation.x,e,rotation.z))
    }
    const setZ=(e:number)=>{
        e = isNaN(e)?0:e;
        if(selectMesh){
            selectMesh.current.rotation.z=e
        }
        setRotation(new Euler(rotation.x,rotation.y,e))
    }

    useEffect(()=>{
        InitRosition()
    },[]);

    useEffect(()=>{
        InitRosition()
    },[selectMesh])

    return(
        <div className="w-full">
            <div>

            </div>
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={rotation.x}
            sliderChangeEvent={setX}
            inputChangeEvent={(e)=>setX(+e.target.value)}
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={rotation?.y}
            sliderChangeEvent={setY}
            inputChangeEvent={(e)=>setY(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={rotation?.z}
            sliderChangeEvent={setZ}
            inputChangeEvent={(e)=>setZ(+e.target.value)}
            />
        </div>
    )
}