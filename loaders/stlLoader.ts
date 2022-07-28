
import { LoadingManager} from 'three'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { FileInfo } from "../global/interfaces/swr.interface"

interface ISTLLoader{
    fileInfo:FileInfo
}

const CustomSTLLoader=({fileInfo}:ISTLLoader)=>{

    const baseURL = 'blob:http://localhost:3000/'
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

            const loader = new STLLoader(manager)
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

export default CustomSTLLoader