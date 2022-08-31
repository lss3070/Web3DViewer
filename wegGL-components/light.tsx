import { Fragment, useEffect, useState } from 'react';
import { Color, HemisphereLight, Vector3 } from "three"

export const LightComponent=()=>{

    const [ambientLight,setAmbientLight] = useState<any>({
        able:true,
        intensity:1,
        color:'#A4A4A4'
    })
    
    const [pointLight,setPointLight] = useState<any>({
        able:true,
        position:new Vector3(400,0,0),
        power:100,
        intensity:1,
        distance:0,
        decay:2
    })

    return(
        <Fragment>
            <light color={ambientLight.color}></light>
                {/* 모든 오브젝트 전역으로 빚춰줌 */}
                {ambientLight.able?(
                <ambientLight 
                intensity={ambientLight.intensity} 
                color={ambientLight.color}/>
                ):null}

                {/* 한방향으로 빛,원뿔모양 빛,그림자 생김*/}
                {/* {lightState?.spotLight.able?(
                <spotLight position={lightState?.spotLight.position} 
                intensity={lightState?.spotLight.intensity}
                power={lightState?.spotLight.power}
                angle={lightState?.spotLight.angle} 
                penumbra={lightState?.spotLight.penumbra}
                decay={1}
                />
                ):null} */}
                {/* 모든방향으로 빛을 쏴줌,구모양 빛 전구같음*/}
                {pointLight.able?(
                    <pointLight 
                    position={pointLight.position} 
                    power={pointLight.power} 
                    intensity={pointLight.intensity} />
                ):null}
                <directionalLight color={new Color(255,255,255)} intensity={0.001} position={new Vector3(0,400,0)} />
                <directionalLight color={new Color(255,255,255)} intensity={0.001} position={new Vector3(400,0,0)} />
                <directionalLight color={new Color(255,255,255)} intensity={0.001} position={new Vector3(0,0,400)} />
        </Fragment>
    )
}