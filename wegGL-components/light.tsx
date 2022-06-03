import { Fragment, useEffect } from 'react';
import { Color, HemisphereLight, Vector3 } from "three"
import { useLightSWR } from '../swrs/light.swr';

export const LightComponent=()=>{

    const {lightState}=useLightSWR()

    return(
        <Fragment>
            <light color={lightState?.ambientLight.color}></light>
                {/* 모든 오브젝트 전역으로 빚춰줌 */}
                {lightState?.ambientLight.able?(
                <ambientLight 
                intensity={lightState?.ambientLight.intensity} 
                color={lightState.ambientLight.color}/>
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
                {lightState?.pointLight.able?(
                    <pointLight 
                    position={lightState?.pointLight.position} 
                    power={lightState?.pointLight.power} 
                    intensity={lightState?.pointLight.intensity} />
                ):null}
                <directionalLight color={new Color(255,255,255)} intensity={0.001} position={new Vector3(0,400,0)} />
                <directionalLight color={new Color(255,255,255)} intensity={0.001} position={new Vector3(400,0,0)} />
                <directionalLight color={new Color(255,255,255)} intensity={0.001} position={new Vector3(0,0,400)} />
        </Fragment>
    )
}