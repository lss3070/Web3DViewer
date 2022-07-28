import { LoadFileType } from "../global/enums/file.enum";
import { IFileTransform } from "../global/interfaces/file.interface";


const FileTransForm=(files:FileList):IFileTransform=>{
    let originExtension:string='';
    let originName:string='';
    let originLink:string='';
    const fileMap = new Map<string,File>();

    for(let i=0;i<files?.length!;i++){
            
        const file = files?.item(i)!;
        fileMap.set(file.name,file)
        const commaIndex = file?.name?.lastIndexOf('.')

        const name = file.name.slice(0,commaIndex)
        const extension = file?.name?.slice( commaIndex+1,file.name.length);
        const link = window.URL.createObjectURL(file);

        if(Object.values(LoadFileType).includes(extension as LoadFileType)){
            originExtension=extension;
            originName=name;
            originLink=link;
        }
    }

    return {
        originExtension,
        originName,
        originLink,
        fileMap
    }
}

export default FileTransForm;