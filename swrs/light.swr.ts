import useSWR from "swr";
import { Color as ThreeColor, PointLight, Vector3 } from "three";
import { ILightStateProps } from "../interfaces/swr.interface";

let lightState:ILightStateProps={
    spotLight:{
        able:true,
        position:new Vector3(400,0,0),
        angle:0.15,
        penumbra:0,
        intensity:1,
        power:100,
    },
    pointLight:{
        able:true,
        position:new Vector3(400,0,0),
        power:100,
        intensity:1,
        distance:0,
        decay:2
    },
    ambientLight:{
        able:true,
        intensity:1,
        color:'#A4A4A4'
    },
    bright:1,
    color:new ThreeColor(0,0,0)
};

export const useLightSWR=()=>{
    const {data,mutate}=useSWR<ILightStateProps>('lightStateKey',()=>{
        return lightState;
    });

    return{
        lightState:data,
        setPointAble:(able:boolean)=>{
            lightState={
                ...lightState,
                pointLight:{
                    ...lightState.pointLight,
                    able
                }
            }
            return mutate();
        },
        setPointPosition:(position:Vector3)=>{
            lightState={
                ...lightState,
                pointLight:{
                    ...lightState.pointLight,
                    position
                }
            }
            return mutate();
        },
        setPointPower:(power:number)=>{
            lightState={
                ...lightState,
                pointLight:{
                    ...lightState.pointLight,
                    power
                }
            }
            return mutate();
        },
        setPointIntensity:(intensity:number)=>{
            lightState={
                ...lightState,
                pointLight:{
                    ...lightState.pointLight,
                    intensity
                }
            }
            return mutate();
        },
        setAmbientAble:(able:boolean)=>{
            lightState={
                ...lightState,
                ambientLight:{
                    ...lightState.ambientLight,
                    able
                }
            }
            return mutate();
        },
        setAmbientIntensity:(intensity:number)=>{
            lightState={
                ...lightState,
                ambientLight:{
                    ...lightState.ambientLight,
                    intensity
                }
            }
            return mutate();
        },
        setAmbientColor:(color:string)=>{
            lightState={
                ...lightState,
                ambientLight:{
                    ...lightState.ambientLight,
                    color
                }
            }
            return mutate();
        },
        setSpotAble:(able:boolean)=>{
            lightState={
                ...lightState,
                spotLight:{
                    ...lightState.spotLight,
                    able
                }
            }
            return mutate();
        },
        setSpotIntensity:(intensity:number)=>{
            lightState={
                ...lightState,
                spotLight:{
                    ...lightState.spotLight,
                    intensity
                }
            }
            return mutate();
        },
        setSpotPower:(power:number)=>{
            lightState={
                ...lightState,
                spotLight:{
                    ...lightState.spotLight,
                    power
                }
            }
            return mutate();
        },
        setSpotAngle:(angle:number)=>{
            lightState={
                ...lightState,
                spotLight:{
                    ...lightState.spotLight,
                    angle
                }
            }
            return mutate();
        },
        setSpotPenumbra:(penumbra:number)=>{
            lightState={
                ...lightState,
                spotLight:{
                    ...lightState.spotLight,
                    penumbra
                }
            }
            return mutate();
        },
        setBright:async(bright:number)=>{
            lightState={
                ...lightState,
                bright
            }
            return mutate();
        },
        setColor:async(color:ThreeColor)=>{
            lightState={
                ...lightState,
                color
            }
            return mutate();
        }
    }
}