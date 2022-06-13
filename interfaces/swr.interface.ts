
import { Box3, Mesh, Object3D, Sphere, Vector3,Color as ThreeColor, Scene } from "three";
import { CustomDataNode } from "./app.interface";

import { MutableRefObject, RefObject } from "react";
import { MotionValue } from "framer-motion";

export declare type ObjectRef = MutableRefObject<Object3D>;

export enum MeshMode{
  Default,
  Point,
  Wire
}

 export interface IMeshStateProps {
    hoverMesh?:ObjectRef;
    selectMesh:ObjectRef[];
    staticMeshList:ObjectRef[];
    onInfo:boolean;
    meshMode:MeshMode;
    textScale?:number;
    uuid?:string;
  }
  

 export interface ICameraStateProps {
   control?:ObjectRef;
   camera?:ObjectRef;
  zoom:number,
  position:Vector3,
  moveMode:boolean
  fov:number;
  aspect:number;
  meshBox:Box3;
  selectMeshBox?:Box3;
  sphere?:Sphere;
  target?:Vector3;
}

export interface ICommonStateProps{
  filePath?:string;
  extension?:string;
  groupList?:CustomDataNode[];
  scene?:RefObject<Scene>;
  mobileHelperComponent?:JSX.Element;
  onMobile?:boolean;
  onText:boolean;
  onWire:boolean;
}
interface IAmbientLight{
  able:boolean;
  intensity:number;
  color:string;
  
}
interface ISpotLight{
  able:boolean;
  position:Vector3;
  intensity:number;
  angle:number;
  penumbra:number;
  power:number;
}
interface IPointLight{
  able:boolean;
  position:Vector3;
  power:number;
  intensity:number;
  distance:number;
  decay:number;
}
export interface ILightStateProps{
  ambientLight:IAmbientLight;
  spotLight:ISpotLight;
  pointLight:IPointLight;

  bright:number;
  color:ThreeColor;
}

export interface IAnimationStateProps{
  onPostion:boolean;
  onRotation:boolean;
  onScale:boolean;
  position:Vector3;
  rotation:Vector3;
  scale:Vector3;
  positionSpeed:Vector3;
  rotationSpeed:Vector3;
  scaleSpeed:Vector3;
}

export interface IMenuStateProps{
  OnTreeList:boolean;
  OnControl:boolean;
  OnDetail:boolean;
  simpleControl:IMenuModal;
}

export interface IMenuModal{
  on:boolean;
  x?:number;
  y?:number;
}