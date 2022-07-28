
import { LoadingManager} from 'three'
import { FileInfo } from "../../global/interfaces/swr.interface"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

interface IGLTFLoader{
    fileInfo:FileInfo
}

const CustomOBJLoader=({fileInfo}:IGLTFLoader)=>{

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

            const loader = new OBJLoader(manager)
            .setCrossOrigin('anonymous')

            const blobURLs:any[]=[]

            loader.load(fileInfo.originPath,(obj)=>{
                blobURLs.forEach(URL.revokeObjectURL);
                
                resolve(obj)
            },undefined,reject)
        }).then((object)=>{
            return object 
        })
        
}

export default CustomOBJLoader