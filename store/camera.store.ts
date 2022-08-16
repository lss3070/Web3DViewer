import create from "zustand";
import { CustomDataNode } from "../global/interfaces/app.interface";
import {Box3, Camera, PerspectiveCamera, Vector3} from 'three';
import { ObjectRef, ZoomBox } from '../global/interfaces/swr.interface';
import { TrackballControls } from "three-stdlib";

interface ICameraStateProps{
    onZoom:boolean;
    position:Vector3;
    meshBox:Box3;
    control?:TrackballControls;
    camera?:PerspectiveCamera;
    target:Vector3;
    zoomBox?:ZoomBox;
    setControlRef:(control:TrackballControls)=>void;
    setTarget:(target:Vector3)=>void;
    setZoomBox:(zoomBox:ZoomBox)=>void;
    setPosition:(position:Vector3)=>void;
    setOnZoom:(onZoom:boolean)=>void;
    setMeshBox:(meshBox:Box3)=>void;
    setCamera:(camera:PerspectiveCamera)=>void;
}

const useCameraStore= create<ICameraStateProps>((set)=>({
    onZoom:false,
    position:new Vector3(),
    meshBox:new Box3(),
    target:new Vector3(0,0,0),
    setTarget:(target:Vector3)=>set((state)=>({
        ...state,
        target
    })),
    setControlRef:(control:TrackballControls)=>set((state)=>({
        ...state,
        control
    })),
    setZoomBox:(zoomBox:ZoomBox)=>set((state)=>({
        ...state,
        zoomBox
    })),
    setPosition:(position:Vector3)=>set((state)=>({
        ...state,
        position
    })),
    setOnZoom:(onZoom:boolean)=>set((state)=>({
        ...state,
        onZoom
    })),
    setMeshBox:(meshBox:Box3)=>set((state)=>({
        ...state,
        meshBox
    })),
    setCamera:(camera:PerspectiveCamera)=>set((state)=>({
        ...state,
        camera
    }))
}));

export default useCameraStore;