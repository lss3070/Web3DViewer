import { Canvas } from "@react-three/fiber"
import { useRef, useState, useEffect } from 'react';
import {Box3, Group, Material, ObjectLoader, Scene, Vector3 } from "three"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'

import { CameraComponent } from "./camera"
import { LightComponent } from "./light";
import { Geometry } from "three-stdlib";

import fs from 'fs';
import { useCommonSWR } from "../swrs/common.swr";
import { useCameraSWR } from "../swrs/camera.swr";
import { CustomDataNode } from "../interfaces/app.interface";
import { ControlComponent } from "./control";
import { MeshGroupComponent } from "./mesh-group";
import { SelectMeshComponent } from "./outLineMesh";

interface ICanvasProps{
    setLoadingPercent:Function;
    setLoadingComplete:Function;
}

export const CanvasComponent=({setLoadingPercent,setLoadingComplete}:ICanvasProps)=>{

    const {commonState,setGroupList,setScene}=useCommonSWR();
    const {setMeshBox}=useCameraSWR();

    const sceneRef = useRef<Scene>(null)
    const [meshGroup,setMeshGroup]=useState<Group>();

    const fbxLoader= new FBXLoader();
    const objLoader=new OBJLoader();
    const objectLoader = new ObjectLoader();

    useEffect(()=>{
        if(commonState?.extension!==undefined){
            console.log(commonState.extension)
            setLoadingComplete(false);
            switch(commonState?.extension!){
                case 'obj':
                    objLoader.loadAsync(commonState?.filePath!,(progress)=>{
                        setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    }).then((obj)=>{
                        console.log(obj);
                        new Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1);

                        const group = groupLoop(obj);

                        setGroupList(group); 
                        setMeshGroup(obj); 

                        const box = new Box3().setFromObject(obj);

                        setMeshBox(box);
                        setLoadingComplete(true);
                    }).catch((err)=>{
                        alert(err)
                        setLoadingComplete(true);
                    });
                    break;
                case 'fbx':
                    fbxLoader.load(commonState?.filePath!,(fbx)=>{
                        console.log(fbx);
                        new Box3().setFromObject(fbx).getCenter(fbx.position).multiplyScalar(-1);

                        const group = groupLoop(fbx);
    
                        setGroupList(group);
                        setMeshGroup(fbx);
                        
                        let size =new Vector3();
                        let cnet = new Vector3();
                        const box = new Box3().setFromObject(fbx);
             
                        console.log(box);
                        setMeshBox(box);
                        setLoadingComplete(true);
                    },(progress)=>{
                        setLoadingComplete(false);
                        setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                    })
                    break;
                    case 'json':
                        console.log(commonState?.filePath!);
                        // var dataArray = JSON.parse(fs.readFileSync(commonState?.filePath!,
                        //     'utf-8'))
                        
                        objectLoader.load(commonState?.filePath!,(data)=>{
                            console.log('data')
                            console.log(data);
                            const temp = new Group();
                            data.children.forEach((ob)=>{
                                if(ob.type==='Object3D'){
                                    ob.children.forEach((item)=>{
                                        if(item.type==='Mesh'){
                                            
                                            temp.add(item)
                                        }
                                    })
                                   
                                }
                               
                            })
                            console.log('temp')
                            console.log(temp);
                            new Box3().setFromObject(temp).getCenter(temp.position).multiplyScalar(-1);

                            const group = groupLoop(temp);
        
                            setGroupList(group);
                            setMeshGroup(temp);
                            
                            let size =new Vector3();
                            let cnet = new Vector3();
                            const box = new Box3().setFromObject(temp);
                 
                            setMeshBox(box);
                            setLoadingComplete(true);
                        },(progress)=>{
                            setLoadingComplete(false);
                            setLoadingPercent(Math.ceil((progress.loaded/progress.total)*100));
                        })
                    break;
                }
        }

    },[commonState?.filePath])

const groupLoop=(item:Group):CustomDataNode[]=>{
    let temp:CustomDataNode[]
    temp=item.children.map((groupItem):CustomDataNode=>{
        switch(groupItem.type){//groupItem.constructor.name
            case'Mesh':
            return {
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name
            }
            case'Group':
            return {
                key:groupItem.uuid,
                type:groupItem.type,
                title:groupItem.name,
                children:groupLoop(groupItem as Group)
            }
            default:
            return {key:groupItem.uuid,type:groupItem.type,title:groupItem.name};
        }
    })
    return temp;
}
    useEffect(()=>{
        setScene(sceneRef)
    },[sceneRef])

    return(
       <Canvas style={{width:'100%',maxHeight:'100vh'}}className="z-10">
            <scene ref={sceneRef}>
                <LightComponent/>                
                <CameraComponent/>
                <ControlComponent/> 
                {meshGroup&&<MeshGroupComponent meshGroup={meshGroup}/>}
                <SelectMeshComponent/>
            </scene>
        </Canvas>
    )
}

function loadJsonFileSync(arg0: string) {
    throw new Error("Function not implemented.");
}
