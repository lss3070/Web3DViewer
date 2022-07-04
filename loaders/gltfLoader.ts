import { useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Group, LoadingManager} from 'three'



import { FileInfo } from "../interfaces/swr.interface"
import SettingModel from './setModel';
import { Dispatch, SetStateAction } from "react";

interface IGLTFLoader{
    fileInfo:FileInfo
}

const CustomGLTFLoader=({fileInfo}:IGLTFLoader)=>{

    const baseURL = 'blob:http://localhost:3000/'
//https://gltf-viewer.donmccurdy.com/ code ㅊㅏㅁ조
        const manager = new LoadingManager()
            return new Promise((resolve,reject)=>{
            manager.setURLModifier((url)=>{
                const normalizedURL= 
                url.replace(baseURL,'').replace(/^(\.?\/)/, '');

                if (fileInfo.fileMap!.has(normalizedURL)) {
                    const blob = fileInfo.fileMap!.get(normalizedURL)!;
                    const blobURL = URL.createObjectURL(blob);
                    blobURLs.push(blobURL);
                    return blobURL;
                  }
                return url
            })

            const loader = new GLTFLoader(manager)
            .setCrossOrigin('anonymous')

            const blobURLs:any[]=[]

            loader.load(fileInfo.originPath,(gltf)=>{
                blobURLs.forEach(URL.revokeObjectURL);
                
                resolve(gltf)
            },undefined,reject)
        }).then((object)=>{
            return (object as GLTF).scene
        })
        
}



export default CustomGLTFLoader