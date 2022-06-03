import useSWR from "swr";
import { Box3, Sphere, Vector3 } from "three";
import { ICameraStateProps, ObjectRef } from "../interfaces/swr.interface";

let cameraState:ICameraStateProps={
    zoom:1,
    position:new Vector3(0,0,400),
    moveMode:true,
    aspect:1,
    fov:50,
    meshBox:new Box3(new Vector3()),
    target:new Vector3(0,0,0)
};


export const useCameraSWR=()=>{
    const {data,mutate}=useSWR<ICameraStateProps>('cameraStateKey',()=>{
        return cameraState;
    });
    return{
        cameraState:data,

        setZoom:async(zoom:number)=>{
            cameraState={
                ...cameraState,
                zoom:zoom
            }
            return mutate();
        },
        setPosition:async(position:Vector3)=>{
            cameraState={
                ...cameraState,
                position:position
            }
            return mutate();
        },
        setMoveMode:async(value:boolean)=>{
            cameraState={
                ...cameraState,
                moveMode:value
            }
            return mutate();
        },
        setFov:async(value:number)=>{
            cameraState={
                ...cameraState,
                fov:value
            }
            return mutate();
        },
        setAspect:async(value:number)=>{
            cameraState={
                ...cameraState,
                aspect:value
            }
            return mutate();
        },
        setMeshBox:async(meshBox:Box3)=>{
            cameraState={
                ...cameraState,
                meshBox:meshBox
            }
            return mutate();
        },
        setSelectMeshBox:async(selectMeshBox:Box3)=>{
            cameraState={
                ...cameraState,
                selectMeshBox:selectMeshBox
            }
            return mutate();
        },
        setSphere:async(sphere:Sphere)=>{
            cameraState={
                ...cameraState,
                sphere:sphere,
            }
            return mutate()
        },
        setTarget:async(target:Vector3)=>{
            cameraState={
                ...cameraState,
                target:target,
            }
            return mutate();
        },
        setCameraRef:async(camera:ObjectRef)=>{
            cameraState={
                ...cameraState,
                camera:camera
            }
            return mutate();
        },
        setControlRef:async(control:ObjectRef)=>{
            cameraState={
                ...cameraState,
                control:control
            }
            return mutate();
        }

    }
}