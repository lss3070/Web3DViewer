import { useLoader } from "@react-three/fiber";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {Group, LoadingManager} from 'three'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'


import { FileInfo } from "../../global/interfaces/swr.interface"
import { Dispatch, SetStateAction } from "react";

interface IGLTFLoader{
    fileInfo:FileInfo
}

const CustomGLBLoader=({fileInfo}:IGLTFLoader)=>{
    const baseURL = `blob:${window.location.origin}`
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
            .setMeshoptDecoder(MeshoptDecoder)

            const blobURLs:any[]=[]

            loader.load(fileInfo.originPath,(gltf)=>{
                blobURLs.forEach(URL.revokeObjectURL);
                
                resolve(gltf)
            },undefined,reject)
        }).then((object)=>{
            const scene= (object as GLTF).scene;
            scene.animations=(object as any).animations
            return scene
        }).catch((error)=>{
            console.log('error');
            console.log(error);
        }).finally(()=>{
            console.log('finally')
        })

}



export default CustomGLBLoader