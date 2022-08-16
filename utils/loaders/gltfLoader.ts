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

const CustomGLTFLoader=({fileInfo}:IGLTFLoader)=>{
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

            const dracoLoader = new DRACOLoader()
            const loader = new GLTFLoader(manager)
            .setCrossOrigin('anonymous')
            .setMeshoptDecoder(typeof MeshoptDecoder === 'function' ? MeshoptDecoder() : MeshoptDecoder)
            .setDRACOLoader(dracoLoader)

            const blobURLs:any[]=[]

            loader.load(fileInfo.originPath,(gltf)=>{
                blobURLs.forEach(URL.revokeObjectURL);
                resolve(gltf)
            },undefined,reject)
        }).then((object)=>{
            return (object as GLTF).scene
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
        })

}



export default CustomGLTFLoader