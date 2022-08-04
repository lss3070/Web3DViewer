import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import { AnimationMixer, AxesHelper, Bone, Box3, CameraHelper, Color, CubeTexture, Euler, Group, Material, Mesh, ObjectLoader, Scene, Vector3, PlaneGeometry, Plane, BackSide, Side, Texture, DoubleSide, FrontSide, Object3D, BufferGeometry, MeshBasicMaterial, MeshPhysicalMaterial, EquirectangularReflectionMapping, AnimationClip, SkinnedMesh, PlaneHelper, BufferAttribute } from 'three';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {Rhino3dmLoader,} from 'three/examples/jsm/loaders/3DMLoader'
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader'
import {PLYLoader} from 'three/examples/jsm/loaders/PLYLoader'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {ThreeMFLoader} from 'three/examples/jsm/loaders/3MFLoader'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader';
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader';

import { CameraComponent } from "./camera"
import { LightComponent } from "./light";

import fs from 'fs';
import { useCommonSWR } from "../swrs/common.swr";
import { useCameraSWR } from "../swrs/camera.swr";
import { CustomDataNode } from "../global/interfaces/app.interface";
import { ControlComponent } from "./control";
import { MeshGroupComponent } from "./mesh-group";
import { SelectMeshComponent } from "./outLineMesh";
import { Bounds, Box, PerspectiveCamera, Sky, TrackballControls, useHelper } from "@react-three/drei";
import Gizmo from './gizmo';
import SkyBox from './sky-box';
import CustomGLTFLoader from '../utils/loaders/gltfLoader';
import { useMeshSWR } from '../swrs/mesh.swr';
import CustomOBJLoader from '../utils/loaders/objLoader';
import CustomFBXLoader from '../utils/loaders/fbxLoader';
import CustomSTLLoader from '../utils/loaders/stlLoader';
import CustomPLYLoader from '../utils/loaders/plyLoader';
import ObjectComponent from './object';
import { SkeletonUtils } from 'three-stdlib';
import Point from './measure/sprite';
import { useMeasureSWR } from '../swrs/measure.swr';

import SpriteComponent from './measure/sprite';
import LineComponent from './measure/line';
import MeasureComponent from './measure/measure';

interface ICanvasProps{
    setLoadingPercent:Function;
    setLoadingComplete:Function;
}
export const CanvasComponent=({setLoadingPercent,setLoadingComplete}:ICanvasProps)=>{

    const {commonState,setGroupList,setScene,setFileLoad,setFileUuid}=useCommonSWR();
    const {setMeshBox,setOnZoom}=useCameraSWR();
    const {meshState,setAnimationList}=useMeshSWR()
    const sceneRef = useRef<Scene>(null)
    
    const [meshGroup,setMeshGroup]=useState<Group>();
    const [bone,setBone]=useState<Bone>();
    const [color,setColor] =useState<string>('#2a2b2e');


    const threeDMLoader = new Rhino3dmLoader();
    const threeMFLoader = new ThreeMFLoader();


    const SettingModel =(data:Group|Object3D<Event>|BufferGeometry)=>{
  
        switch(data.type){
            case 'Group':
                const object =data as Group;

                new Box3().setFromObject(object).getCenter(object.position).multiplyScalar(-1);
    
                const boneIndex=object.children.findIndex((item)=>item.type==='Bone');

                const group = groupLoop(object);
                 
                setGroupList(group);
                
                setMeshGroup(object);
        
                const box = new Box3().setFromObject(object);
                      
                setFileLoad(true);
                // setMeshBox(box);
                setLoadingComplete(true);
                setAnimationList(object.animations);
                setFileUuid(object.uuid);
                break;
            case 'BufferGeometry':
                const geometry =data as BufferGeometry;

                const bufferMaterial = new MeshPhysicalMaterial()
                const mesh =new Mesh(geometry,bufferMaterial);
                const bufferGroup = new Group()
                bufferGroup.add(mesh)

                setGroupList(groupLoop(bufferGroup));
                setMeshGroup(bufferGroup);
        
                                
                setFileLoad(true);

                setLoadingComplete(true);
                break;
        }
    }

    useEffect(()=>{
        if(commonState?.fileInfo?.originExtension!==undefined){
            console.log(commonState.fileInfo.originExtension);
            setLoadingComplete(false);
            switch(commonState?.fileInfo?.originExtension){
                case 'obj':
                    CustomOBJLoader({
                        fileInfo:commonState?.fileInfo!
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case 'fbx':
                    CustomFBXLoader({
                        fileInfo:commonState?.fileInfo!
                    }).then((data)=>{

                        console.log(data);
                       SettingModel(data as Group);
                    })
                    break;
                case 'stl':
                    CustomSTLLoader({
                        fileInfo:commonState?.fileInfo!
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case 'ply':
                    CustomPLYLoader({
                        fileInfo:commonState?.fileInfo!
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case 'gltf':
                    CustomGLTFLoader({
                        fileInfo:commonState?.fileInfo!
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case 'glb':
                    CustomGLTFLoader({
                        fileInfo:commonState?.fileInfo!
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case '3dm':
                    threeDMLoader.load(commonState.fileInfo.originPath!,(load)=>{
                        console.log(load)
                    },(pro)=>{

                    },(error)=>{
                        console.log(error);
                    })
                    // threeDMLoader.loadAsync(commonState.filePath!,(progress)=>{
                    //     setLoadingComplete(false);
                    //     setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    // }).then((dm)=>{
                    //     console.log(dm);
                    //     // SettingModel(dm);
                    // }).catch((err)=>{
                    //     alert(err)
                    //     setLoadingComplete(true);
                    // })
                    break;
                case '3mf':
                    threeMFLoader.load(commonState.fileInfo.originPath!,(load)=>{
                        // SettingModel(load);
                    },(progress)=>{
                        setLoadingComplete(false);
                        setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    },(error)=>{
                        alert(error)
                        setLoadingComplete(true);
                    })
                    break;
                }
                
        }

    },[commonState?.fileInfo])

    const converToFile=async(url:string)=>{
        let response = await fetch(url);
        let blob = await response.blob();
        return blob.arrayBuffer
    }
   
    useEffect(()=>{
        commonState?.darkMode?setColor('#2a2b2e'):setColor('#f7fafb')
    },[commonState?.darkMode])

const groupLoop=(item:Object3D<Event>|Group):CustomDataNode[]=>{

   const result= item.children.reduce((array:CustomDataNode[],object,index)=>{
        
        if(object.type==='Mesh'||object.type==='Group'||
        object.type==='SkinnedMesh'||object.type==='Bone'
        ) {
            const title = object.name?object.name:'(no name)';
            const dataNode = {
                visible:true,
                select:false,
                key:object.uuid,
                type:object.type,
                title,
                children:groupLoop(object as Object3D<Event>)
            }as CustomDataNode

            //Group객체에 children이 비워져있을 경우 treenode에 보여줄 필요 없음.
            if(object.type==='Group'){
                dataNode.children?.length!>0&&array.push(dataNode)
            }else{
                array.push(dataNode)
            }
            
        }
        return array;
    },[])

    return result;
}
    useEffect(()=>{
        setScene(sceneRef)
    },[sceneRef])

    const offZoom=()=>{
        setOnZoom(false)
    }
    
//     const mixer = new AnimationMixer(three.scene);
//     const clip= AnimationClip.findByName(meshState?.animationList!,'Take 001');

//     const action= mixer.clipAction(clip);
//     action.play();
    

//     useFrame((state,delta)=>{
//         mixer?.update(delta);
//     })


    // const mixer= new AnimationMixer(commonState?.scene?.current!);

    // if(true){
                  
    //     const clip=meshState?.animationList![0]!;
    //     // const clip= AnimationClip.findByName(meshState?.animationList!,"Take 001");

    //     console.log(mixer);
    //     console.log(clip);
    //     const action= mixer.clipAction(clip);
    //     action.play();
    // }
    // useFrame((state, delta)=>{
    //     mixer?.update(delta)
    // })



    return(
        <>
            <Canvas onClick={offZoom} onWheel={offZoom}
            style={{
            backgroundColor:color
        }}
            className="z-10 bg-[#f7fafb] dark:bg-[#2a2b2e]"

            >   
                <scene ref={sceneRef}>  
                    <SkyBox/>
                    <LightComponent/>                
                    <CameraComponent/>
                    <ControlComponent/> 
                    {meshGroup&&(
                        <>
                            <Bounds margin={1.5}>
                                <ObjectComponent group={meshGroup} bone={bone}/>
                            </Bounds>
                            <SelectMeshComponent/>
                            <Gizmo/>
                            <MeasureComponent/>
                        </>
                    )}
                  {/* <gridHelper args={[1000,1000,1000]}/>  */}
                </scene>
            </Canvas>
        </>
    )
}
