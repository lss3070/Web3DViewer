import { Col, Collapse, Row, Slider,Button } from "antd"
import { useMemo, useState } from "react"
import { AmbientLight, Color, PointLight } from 'three';
import { useLightSWR } from "../../swrs/light.swr";
import { AmbientLightHelper } from "./light/ambientLight";
import { PointLightHelper } from './light/pointLightHelper';
import { SpotLightHelper } from './light/spotLight';


export const LightHelperComponent=()=>{
    const {Panel}=Collapse;

    const {lightState,
        setSpotAble,
        setSpotAngle,
        setSpotPenumbra,
        setSpotPower,
        
        }=useLightSWR();


    const [colorPicker,setColorPicker]=useState<boolean>(false);

    // const [reactColor,setReactColor]=useState<ReactColor>();

    const reactColor = useMemo(()=>{
        return lightState?.ambientLight.color
    },[lightState?.ambientLight.color])

    return(
        <Collapse>
            <Panel header="Light" key="1">
                <Collapse>
                    <Panel header="AmbientLight" key="1">
                        <AmbientLightHelper/>
                    </Panel>
                    <Panel header="PointLight" key="2">
                        <PointLightHelper/>
                    </Panel>
                    <Panel header="SpotLight" key="3">
                        <SpotLightHelper/>
                    </Panel>
                </Collapse>
                {/* <AmbientLightHelper/>
                <PointLightHelper/>
                <SpotLightHelper/> */}
            </Panel>
        </Collapse>
        )
}