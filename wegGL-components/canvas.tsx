import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo, Dispatch, SetStateAction, useLayoutEffect } from 'react';
import { AnimationMixer, AxesHelper, Bone, Box3, CameraHelper, Color, CubeTexture, Euler, Group, Material, Mesh, ObjectLoader, Scene, Vector3, PlaneGeometry, Plane, BackSide, Side, Texture, DoubleSide, FrontSide, Object3D, BufferGeometry, MeshBasicMaterial, MeshPhysicalMaterial, EquirectangularReflectionMapping, AnimationClip, SkinnedMesh, PlaneHelper, BufferAttribute } from 'three';

import {Rhino3dmLoader,} from 'three/examples/jsm/loaders/3DMLoader'
import {ThreeMFLoader} from 'three/examples/jsm/loaders/3MFLoader'

import { CameraComponent } from "./camera"
import { LightComponent } from "./light";

import fs from 'fs';
import { CustomDataNode } from "../global/interfaces/app.interface";
import { ControlComponent } from "./control";
import { MeshGroupComponent } from "./mesh-group";
import { SelectMeshComponent } from "./outLineMesh";
import { Bounds, Box, PerspectiveCamera, Sky, Stats, TrackballControls, useGLTF, useHelper } from "@react-three/drei";
import Gizmo from './gizmo';
import SkyBox from './sky-box';
import CustomGLTFLoader from '../utils/loaders/gltfLoader';
import CustomOBJLoader from '../utils/loaders/objLoader';
import CustomFBXLoader from '../utils/loaders/fbxLoader';
import CustomSTLLoader from '../utils/loaders/stlLoader';
import CustomPLYLoader from '../utils/loaders/plyLoader';
import MeasureComponent from './measure/measure';
import ModelComponent from './model';
import CustomGLBLoader from '../utils/loaders/glbLoader';
import useMeasureStore from '../store/measure.store';
import useFileStore from '../store/file.store';
import useDarkStore from '../store/dark.store';
import useSceneStore from '../store/scene.store';
import useTreeStore from '../store/tree.store';
import useMeshStore from '../store/mesh.store';
import useAnimationStore from '../store/animation.store';
import useCameraStore from '../store/camera.store';
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';

interface ICanvasProps{
    setLoadingPercent:Dispatch<SetStateAction<number>>;
    setLoadingComplete: Dispatch<SetStateAction<boolean>>;
}
export const CanvasComponent=({setLoadingPercent,setLoadingComplete}:ICanvasProps)=>{

    const fileInfo=useFileStore((state)=>state.fileInfo)
    const darkMode = useDarkStore((state)=>state.darkMode);
    const setScene= useSceneStore((state)=>state.setScene);
    const setGroupList = useTreeStore((state)=>state.setGroupList)


    const [setFileLoad,setFileUuid]=useFileStore((state)=>[
        state.setFileLoad,
        state.setFileUuid
    ])
    const setInitSelectMesh=useMeshStore((state)=>state.setInitSelectMesh)


    const [camera,setMeshBox,setOnZoom]=useCameraStore((state)=>[
        state.camera,
        state.setMeshBox,
        state.setOnZoom
    ])

    const initMeasure=useMeasureStore((state)=>state.initMeasure)

    const setAnimationList=useAnimationStore((state)=>
        state.setCustomAnimationList
    )
    const sceneRef = useRef<Scene>(null)

    
    const [meshGroup,setMeshGroup]=useState<Group>();
    const [bone,setBone]=useState<Bone>();
    const [color,setColor] =useState<string>('#f7fafb');


    const threeDMLoader = new Rhino3dmLoader();
    const threeMFLoader = new ThreeMFLoader();

    const ee = new Map()


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

                setGroupList(groupLoop(bufferGroup));
                setMeshGroup(bufferGroup);
        
                                
                setFileLoad(true);

                setLoadingComplete(true);
                break;
        }
    }

    const InitLoad=()=>{
        initMeasure();
        setInitSelectMesh()
        camera?.up.set(0,1,0)
    }

    useEffect(()=>{ 
        InitLoad();
        if(fileInfo?.originExtension!==undefined){
            setLoadingComplete(false);
            switch(fileInfo?.originExtension){
                case 'obj':
                    CustomOBJLoader({
                        fileInfo:fileInfo
                    }).then((data)=>{
                   
                       SettingModel(data as Group);
                    })
                    break;
                case 'fbx':
                    CustomFBXLoader({
                        fileInfo:fileInfo
                    }).then((data)=>{
                       
                       SettingModel(data as Group);
                    })
                    break;
                case 'stl':
                    CustomSTLLoader({
                        fileInfo:fileInfo
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case 'ply':
                    CustomPLYLoader({
                        fileInfo:fileInfo
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case 'gltf':
                    CustomGLTFLoader({
                        fileInfo:fileInfo
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case 'glb':
                    CustomGLBLoader({
                        fileInfo:fileInfo
                    }).then((data)=>{
                       SettingModel(data as Group);
                    })
                    break;
                case '3dm':
                    threeDMLoader.load(fileInfo.originPath!,(load)=>{
                     
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
                    threeMFLoader.load(fileInfo.originPath!,(load)=>{
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
    },[fileInfo])
   
    useIsomorphicLayoutEffect(()=>{
        darkMode?setColor('#2a2b2e'):setColor('#f7fafb')
    },[darkMode])

const groupLoop=(item:Object3D<Event>|Group):CustomDataNode[]=>{

   const result= item.children.reduce((array:CustomDataNode[],object,index)=>{
        
        if(object.type==='Mesh'||object.type==='Group'||
        object.type==='SkinnedMesh'||object.type==='Bone'||object.type==='Object3D'
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
            <Canvas onClick={offZoom} 
            onWheel={offZoom} 
            onTouchEnd={offZoom}
            
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
                                <ModelComponent group={meshGroup} bone={bone}/>
                            </Bounds>
                            <SelectMeshComponent/>
                            <Gizmo/>
                            <MeasureComponent/>
                            {/* <Stats/> */}
                        </>
                    )}
                  {/* <gridHelper args={[1000,1000,1000]}/>  */}
                </scene>
            </Canvas>
        </>
    )
}
