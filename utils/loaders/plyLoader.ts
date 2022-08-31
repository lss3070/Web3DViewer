
import { LoadingManager} from 'three'
import { FileInfo } from "../../global/interfaces/swr.interface"
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

interface IPLYLoader{
    fileInfo:FileInfo
}

const CustomPLYLoader=({fileInfo}:IPLYLoader)=>{

    const baseURL = `blob:${window.location.host}`
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

            const loader = new PLYLoader(manager)
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

export default CustomPLYLoader