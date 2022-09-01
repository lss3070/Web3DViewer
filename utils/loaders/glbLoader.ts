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

            const dracoLoader=new DRACOLoader()

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

            // const object3d= (object as GLTF).scene.children[0]
            // const group =new Group();
            // group.position.set(object3d.position.x,
            //     object3d.position.y,
            //     object3d.position.z
            //     )
            // group.scale.set(object3d.scale.x,
            //     object3d.scale.y,
            //     object3d.scale.z
            // )
            // group.rotation.set(object3d.rotation.x,
            //     object3d.rotation.y,
            //     object3d.rotation.z
            // )
            // group.children=object3d.children;
            // group.name=object3d.name;
            const scene= (object as GLTF).scene
            scene.animations=(object as any).animations
            return scene
        }).catch((error)=>{
            console.log(error);
        }).finally(()=>{
        })

}



export default CustomGLBLoader