import { Canvas, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { AnimationMixer, AxesHelper, Bone, Box3, CameraHelper, Color, CubeTexture, Euler, Group, Material, Mesh, ObjectLoader, Scene, Vector3, PlaneGeometry, Plane, BackSide, Side, Texture, DoubleSide, FrontSide, Object3D, BufferGeometry, MeshBasicMaterial, MeshPhysicalMaterial, EquirectangularReflectionMapping } from 'three';
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
import { Box, PerspectiveCamera, TrackballControls, useHelper } from "@react-three/drei";
import Axes from './axes';
import SkyBox from './sky-box';
import CustomGLTFLoader from '../loaders/gltfLoader';
import { useMeshSWR } from '../swrs/mesh.swr';

interface ICanvasProps{
    setLoadingPercent:Function;
    setLoadingComplete:Function;
}
export const CanvasComponent=({setLoadingPercent,setLoadingComplete}:ICanvasProps)=>{

    const {commonState,setGroupList,setScene,setFileLoad,setFileUuid}=useCommonSWR();
    const {setMeshBox}=useCameraSWR();
    const {meshState}=useMeshSWR()
    const sceneRef = useRef<Scene>(null)
    const [meshGroup,setMeshGroup]=useState<Group>();

    

    const fbxLoader= new FBXLoader();
    const objLoader=new OBJLoader();
    const threeDMLoader = new Rhino3dmLoader();
    const stlLoader = new STLLoader();
    const plyLoader = new PLYLoader();
    const gltfLoader = new GLTFLoader();
    const threeMFLoader = new ThreeMFLoader();
    const rgbeLoader = new RGBELoader();
    const dracoLoader= new DRACOLoader();

    const objectLoader = new ObjectLoader();


    const SettingModel =(data:Group|Object3D<Event>|BufferGeometry)=>{
        console.log(data);
        switch(data.type){
            case 'Group':
                const object =data as Group;
                new Box3().setFromObject(object).getCenter(object.position).multiplyScalar(-1);
    
                const group = groupLoop(object);
        
                setGroupList(group);
                setMeshGroup(object);
        
                const box = new Box3().setFromObject(object);
                      
                setFileLoad(true);
                setMeshBox(box);
                setLoadingComplete(true);
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
       
        console.log(commonState?.fileInfo);
        if(commonState?.fileInfo?.originExtension!==undefined){
            setLoadingComplete(false);
            switch(commonState?.fileInfo?.originExtension){
                case 'obj':
                    objLoader.loadAsync(commonState.fileInfo.originPath,(progress)=>{
                        setLoadingComplete(false);
                        setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    }).then((obj)=>{         
                        // SettingModel(obj)
                    }).catch((err)=>{
                        alert(err)
                        setLoadingComplete(true);
                    });
                    break;
                case 'fbx':
                    fbxLoader.loadAsync(commonState.fileInfo.originPath,(progress)=>{
                        setLoadingComplete(false);
                        setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    }).then((fbx)=>{
                        // SettingModel(fbx);
                    }).catch((err)=>{
                        alert(err)
                        setLoadingComplete(true);
                    })
                    break;
                case 'stl':
                    stlLoader.loadAsync(commonState.fileInfo.originPath,(progress)=>{
                        setLoadingComplete(false);
                        setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    }).then((stl)=>{
                        console.log(stl);
                        // SettingModel(stl);
                    }).catch((err)=>{
                        alert(err)
                        setLoadingComplete(true);
                    })
                    break;
                case 'ply':
                    plyLoader.loadAsync(commonState.fileInfo.originPath,(progress)=>{
                        setLoadingComplete(false);
                        setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    }).then((ply)=>{
                        // SettingModel(ply);
                    }).catch((err)=>{
                        alert(err)
                        setLoadingComplete(true);
                    })
                    break;
                case 'gltf':
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
        switch(groupItem.type){//groupItem.constructor.name
           
            case'Mesh':
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name,
                children:groupLoop(groupItem as Mesh)
            }
            case'Group':
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name,
                children:groupLoop(groupItem as Group)
            }
            case 'Bone':
                return{
                    visible:true,
                    select:false,
                    key:groupItem.uuid,
                    type:groupItem.type,
                    title:groupItem.name,
                    children:groupLoop(groupItem as Bone)
                }
            default:
            return {
                visible:true,
                select:false,
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name
            };
        }
    })
    return temp;
}

    useEffect(()=>{
        setScene(sceneRef)
    },[sceneRef])
    

    return(
        <>
            <Axes/>
            <Canvas style={{width:'100%',maxHeight:'100vh'}}className="z-10"
            >
                <color attach="background" 
                args={[commonState?.darkMode?"#2a2b2e":'#ffffff']} 
                />
                <scene ref={sceneRef} 
                >     
                    <SkyBox/>
                    <LightComponent/>                
                    <CameraComponent/>
                    <ControlComponent/> 
                    {meshGroup&&<MeshGroupComponent meshGroup={meshGroup}/>}
                    <SelectMeshComponent/>
                </scene>
            </Canvas>
        </>
    )
}

function loadJsonFileSync(arg0: string) {
    throw new Error("Function not implemented.");
}

