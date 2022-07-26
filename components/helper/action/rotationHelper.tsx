import { Col, Row, Slider } from "antd";
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useEffect, useState } from "react";
import { Euler, Vector3 } from "three";
import { Helper } from "../../../interfaces/app.interface";
import { useCommonSWR } from "../../../swrs/common.swr";
import { useMeshSWR } from "../../../swrs/mesh.swr";
import SliderItem from "../../sliderItem";

interface IRotationHelper extends Helper{
    // rotation:Euler;
    // rotationAxis:Vector3;
    // setRotation:Function;
}

export const RotationHelper=({}:IRotationHelper)=>{

    const {meshState}=useMeshSWR()
    const [rotation,setRotation]=useState<Euler>(new Euler());
    
    const InitRosition=()=>{
        if(meshState?.selectMesh){
            setRotation(meshState.selectMesh.current.rotation)
        }
    }

    

    const setX=(e:number)=>{
        e = isNaN(e)?0:e;
        if(meshState?.selectMesh){
            meshState.selectMesh.current.rotation.x=e
        }
        setRotation(new Euler(e,rotation.y,rotation.z))
    }
    const setY=(e:number)=>{
        e = isNaN(e)?0:e;
        if(meshState?.selectMesh){
            meshState.selectMesh.current.rotation.y=e
        }
        setRotation(new Euler(rotation.x,e,rotation.z))
    }
    const setZ=(e:number)=>{
        e = isNaN(e)?0:e;
        if(meshState?.selectMesh){
            meshState.selectMesh.current.rotation.z=e
        }
        setRotation(new Euler(rotation.x,rotation.y,e))
    }

    useEffect(()=>{
        InitRosition()
    },[]);

    useEffect(()=>{
        InitRosition()
    },[meshState?.selectMesh])

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