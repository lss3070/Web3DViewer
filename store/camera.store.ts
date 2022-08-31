import create from "zustand";
import { CustomDataNode } from "../global/interfaces/app.interface";
import {Box3, Camera, PerspectiveCamera, Vector3} from 'three';
import { ObjectRef, ZoomBox } from '../global/interfaces/swr.interface';
import { TrackballControls } from "three-stdlib";
import { Box } from "@react-three/drei";

interface ICameraStateProps{
    position:Vector3;
    control?:TrackballControls;
    camera?:PerspectiveCamera;
    target:Vector3;
    setControlRef:(control:TrackballControls)=>void;
    setTarget:(target:Vector3)=>void;
    setPosition:(position:Vector3)=>void;
    setCamera:(camera:PerspectiveCamera)=>void;
}
interface IZoomStateProps{
    onZoom:boolean;
    setOnZoom:(onZoom:boolean)=>void;
}
interface IMeshBoxProps{
    meshBox:Box3;
    setMeshBox:(meshBox:Box3)=>void;
}
interface IZoomBoxProps{
    zoomBox?:ZoomBox;
    setZoomBox:(zoomBox:ZoomBox)=>void;
} 

export const useZoomBoxStore = create<IZoomBoxProps>((set)=>({
    setZoomBox:(zoomBox:ZoomBox)=>set((state)=>({
        ...state,
        zoomBox
    }))
}))
export const useZoomStore = create<IZoomStateProps>((set)=>({
    onZoom:false,
    setOnZoom:(onZoom)=>set((state)=>({
        ...state,
        onZoom
    }))
}))
export const useMeshBoxStore=create<IMeshBoxProps>((set)=>({
    meshBox:new Box3(),
    setMeshBox:(meshBox:Box3)=>set((state)=>({
        ...state,
        meshBox
    })),
}))

const useCameraStore= create<ICameraStateProps>((set)=>({
   
    position:new Vector3(),
    target:new Vector3(0,0,0),
    setTarget:(target:Vector3)=>set((state)=>({
        ...state,
        target
    })),
    setControlRef:(control:TrackballControls)=>set((state)=>({
        ...state,
        control
    })),

    setPosition:(position:Vector3)=>set((state)=>({
        ...state,
        position
    })),
    setCamera:(camera:PerspectiveCamera)=>set((state)=>({
        ...state,
        camera
    }))
}));

export default useCameraStore;