import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { AnimationMixer, AxesHelper, Bone, Box3, CameraHelper, Color, CubeTexture, Euler, Group, Material, Mesh, ObjectLoader, Scene, Vector3, PlaneGeometry, Plane, BackSide, Side, Texture, DoubleSide, FrontSide, Object3D, BufferGeometry, MeshBasicMaterial, MeshPhysicalMaterial, EquirectangularReflectionMapping, AnimationClip } from 'three';
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
import { CustomDataNode } from "../interfaces/app.interface";
import { ControlComponent } from "./control";
import { MeshGroupComponent } from "./mesh-group";
import { SelectMeshComponent } from "./outLineMesh";
import { Box, PerspectiveCamera, Sky, TrackballControls, useHelper } from "@react-three/drei";
import Gizmo from './gizmo';
import SkyBox from './sky-box';
import CustomGLTFLoader from '../loaders/gltfLoader';
import { useMeshSWR } from '../swrs/mesh.swr';
import CustomOBJLoader from '../loaders/objLoader';
import CustomFBXLoader from '../loaders/fbxLoader';
import CustomSTLLoader from '../loaders/stlLoader';
import CustomPLYLoader from '../loaders/plyLoader';

interface ICanvasProps{
    setLoadingPercent:Function;
    setLoadingComplete:Function;
}
export const CanvasComponent=({setLoadingPercent,setLoadingComplete}:ICanvasProps)=>{

    const {commonState,setGroupList,setScene,setFileLoad,setFileUuid}=useCommonSWR();
    const {setMeshBox}=useCameraSWR();
    const {meshState,setAnimationList}=useMeshSWR()
    const sceneRef = useRef<Scene>(null)
    const [meshGroup,setMeshGroup]=useState<Group>();

    const threeDMLoader = new Rhino3dmLoader();
    const threeMFLoader = new ThreeMFLoader();

    const SettingModel =(data:Group|Object3D<Event>|BufferGeometry)=>{

        switch(data.type){
            case 'Group':
                const object =data as Group;
                new Box3().setFromObject(object).getCenter(object.position).multiplyScalar(-1);
    
                
                const group = groupLoop(object);
        
                console.log('!!!!!');
                console.log(object);
                setGroupList(group);
                setMeshGroup(object);
        
                const box = new Box3().setFromObject(object);
                      
                setFileLoad(true);
                setMeshBox(box);
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

                new Box3().setFromObject(bufferGroup).getCenter(bufferGroup.position).multiplyScalar(-1);

                setGroupList(groupLoop(bufferGroup));
                setMeshGroup(bufferGroup);
        
                const bufferBox = new Box3().setFromObject(bufferGroup);
                      
                setFileLoad(true);
                setMeshBox(bufferBox);
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
   

const groupLoop=(item:Mesh|Group|Bone):CustomDataNode[]=>{
    let temp:CustomDataNode[]
    temp=item.children.map((groupItem):CustomDataNode=>{
        const title = groupItem.name?groupItem.name:'(no name)';
        switch(groupItem.type){//groupItem.constructor.name
            case'Mesh':
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title,
                children:groupLoop(groupItem as Mesh)
            }
            case'Group':
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title,
                children:groupLoop(groupItem as Group)
            }
            case 'Bone':
                return{
                    visible:true,
                    select:false,
                    key:groupItem.uuid,
                    type:groupItem.type,
                    title,
                    children:groupLoop(groupItem as Bone)
                }
            default:
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title
            };
        }
    })
    return temp;
}
    useEffect(()=>{
        setScene(sceneRef)
    },[sceneRef])
    
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
            <Canvas style={{width:'100%',maxHeight:'100vh',
            backgroundColor:commonState?.darkMode?'#2a2b2e':'#f7fafb'
        }}
            className="z-10">   
                <scene ref={sceneRef} background={new Color()}>   
                    {/* <color attach="background" 
                    args={[commonState?.darkMode?"#2a2b2e":'#f7fafb']} 
                    />   */}
                    <SkyBox/>
                    <LightComponent/>                
                    <CameraComponent/>
                    <ControlComponent/> 
                    {meshGroup&&(
                        <>
                            <MeshGroupComponent meshGroup={meshGroup}/>
                            <SelectMeshComponent/>
                            <Gizmo/>
                        </>
                    )}
                  
                </scene>
            </Canvas>
        </>
    )
}

function loadJsonFileSync(arg0: string) {
    throw new Error("Function not implemented.");
}

