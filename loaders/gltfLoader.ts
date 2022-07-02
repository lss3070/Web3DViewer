import { useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {LoadingManager} from 'three'


import { FileInfo } from "../interfaces/swr.interface"

interface IGLTFLoader{
    fileInfo:FileInfo
}

const CustomGLTFLoader=async({fileInfo}:IGLTFLoader)=>{

 
    const convertToFile=async(url:string)=>{
        let response = await fetch(url);
        let blob = await response.blob();
        return blob.arrayBuffer();
    }

//https://gltf-viewer.donmccurdy.com/ code ㅊㅏㅁ조
        const manager = new LoadingManager()
  
        return new Promise((resolve,reject)=>{
            manager.setURLModifier((url)=>{
                return url
            })
        })

        const gltfLoader = new GLTFLoader()
  
     gltfLoader.manager.setURLModifier((url)=>{
         if(fileInfo.supportPath){
             console.log(fileInfo.supportPath);
             return fileInfo.supportPath
         }
         return url
     })
     gltfLoader.setCrossOrigin('anonymous')
        
         gltfLoader.
         loadAsync(fileInfo.originPath!,(progress)=>{
           console.log(progress)
         }).then((gltf)=>{
             console.log(gltf);
            console.log('success');
         }).catch((err)=>{
             alert(err)
         })
     }
    return 'e'
}

export default CustomGLTFLoader