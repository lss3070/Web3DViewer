import { Button, Col, Collapse, Row, Slider } from "antd";
import { useEffect, useMemo, useState } from "react";
// import {HexColorPicker} from 'react-colorful'
import { Color } from "three";
import { useLightSWR } from "../../../swrs/light.swr";


export const AmbientLightHelper=()=>{

    const {
        lightState,
        setAmbientAble,
        setAmbientIntensity,
        setAmbientColor,
    } = useLightSWR();

    const {Panel}=Collapse;
    const [colorPicker,setColorPicker]=useState<boolean>(false);

    // const [reactColor,setReactColor]=useState<ReactColor>();


    const [reactColor,setReactColor]= useState<string>('#ffffff');
    
    useEffect(()=>{
        setReactColor(lightState?.ambientLight.color!)
    },[lightState?.ambientLight.color]);

    // const reactColor = useMemo(()=>{

    //     return lightState?.ambientLight.color
    // },[lightState?.ambientLight.color])

    
    
    return(
        <div className="w-72">
            <Row align="middle" justify="center">
                <Col span={6}>
                intensity
                </Col>
                <Col span={14}>
                    <Slider step={0.1} max={1} min={0} value={lightState?.ambientLight.intensity} 
                    onChange={(e)=>{setAmbientIntensity(e)}}/>
                </Col>
                <Col span={3}>
                    {lightState?.ambientLight.intensity}
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Col span={5}>
                    color
                </Col>
                <Col span={16}>
                    {/* <button onClick={()=>setColorPicker(!colorPicker)}>button</button> */}
{/* 
                    <HexColorPicker color={reactColor} 
                        onChange={(color)=>{
                            setAmbientColor(color);
                        }}/> */}

                    {/* <SliderPicker color={reactColor} 
                            onChange={(color)=>{
                                setAmbientColor(color.hex);
                            }}/> */}

                    {/* {colorPicker? 
                        <div className=" absolute z-10">
                            <ChromePicker color={reactColor} 
                            onChange={(color)=>{
                                setAmbientColor(color.hex);
                            }}/>
                        </div>:null} */}
                </Col>
            </Row>
            <Row align="middle" justify="center" className="mt-2">
                <Col span={5}>
                    able
                </Col>
                <Col span={16}>
                    <Button onClick={()=>{setAmbientAble(!lightState?.ambientLight.able)}}>
                        {lightState?.ambientLight.able?'able':'disable'}
                    </Button>
                </Col>
            </Row>  
        </div>  
    )
}