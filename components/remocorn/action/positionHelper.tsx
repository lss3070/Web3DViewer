import { Col, Row, Slider } from "antd"
// import {Slider as MobileSlider} from 'antd-mobile'
import { ChangeEvent, useMemo, useState, useEffect } from 'react';
import { Vector3 } from "three";
import { Helper } from "../../../global/interfaces/app.interface";
import { useMeshSWR } from "../../../swrs/mesh.swr";
import SliderItem from "../common/sliderItem";

interface IPositionHelper extends Helper{
    // position:Vector3;
    // setPosition:Function;
}

export const PositionHelper=({
    
}:IPositionHelper)=>{
    
    const {meshState}=useMeshSWR()
    const [position,setPosition]=useState<Vector3>(new Vector3());


    const InitPosition=()=>{
        if(meshState?.selectMesh){
            setPosition(meshState.selectMesh.current.position)
        }
    }

    const setX=(e:number)=>{
        e = isNaN(e)?0:e;
        if(meshState?.selectMesh){
            meshState?.selectMesh.current.position.setX(e)
        }
        setPosition(new Vector3(e,position.y,position.z))
    }
    const setY=(e:number)=>{
        e = isNaN(e)?0:e;
        if(meshState?.selectMesh){
            meshState?.selectMesh.current.position.setY(e)
        }
        setPosition(new Vector3(position.x,e,position.z))
    }
    const setZ=(e:number)=>{
        e = isNaN(e)?0:e;
        if(meshState?.selectMesh){
            meshState?.selectMesh.current.position.setZ(e)
        }
        setPosition(new Vector3(position.x,position.y,e))
    }

    useEffect(()=>{
        InitPosition()
    },[]);

    useEffect(()=>{
        InitPosition()
    },[meshState?.selectMesh])


    return(
        <div className="w-full">
            <SliderItem
            label='x'
            max={1000}
            min={-1000}
            value={position.x}
            sliderChangeEvent={setX}
            inputChangeEvent={(e)=>setX(+e.target.value)}
            />
            <SliderItem
            label='y'
            max={1000}
            min={-1000}
            value={position?.y}
            sliderChangeEvent={setY}
            inputChangeEvent={(e)=>setY(+e.target.value)}
            />
            <SliderItem
            label='z'
            max={1000}
            min={-1000}
            value={position?.z}
            sliderChangeEvent={setZ}
            inputChangeEvent={(e)=>setZ(+e.target.value)}
            />
        </div>
    )
}