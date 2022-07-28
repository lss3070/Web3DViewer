
import { LoadingManager} from 'three'
import { FileInfo } from "../global/interfaces/swr.interface"
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

interface IFBXLoader{
    fileInfo:FileInfo
}

const CustomFBXLoader=({fileInfo}:IFBXLoader)=>{

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

            const loader = new FBXLoader(manager)

            const blobURLs:any[]=[]

            loader.load(fileInfo.originPath,(fbx)=>{
                blobURLs.forEach(URL.revokeObjectURL);
                resolve(fbx)
            },undefined,reject)
        }).then((object)=>{
            return object 
        })
        
}

export default CustomFBXLoader