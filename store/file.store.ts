import create from "zustand";


interface FileInfo{
    originPath:string;
    originExtension:string;
    originName:string;
    fileMap?:Map<string,File>;
}

interface IFileStateProps{
    fileInfo?:FileInfo;
    fileUuid?:string;
    fileLoad:boolean;
    setFileInfo:(fileInfo:FileInfo)=>void;
    setFileLoad:(fileLoad:boolean)=>void;
    setFileUuid:(fileUuid:string)=>void;
}

const useFileStore= create<IFileStateProps>((set)=>({
    fileLoad:false,
    setFileInfo:(fileInfo:FileInfo)=>set((state)=>({
        ...state,
        fileInfo
    })),
    setFileLoad:(fileLoad:boolean)=>set((state)=>({
        ...state,
        fileLoad
    })),
    setFileUuid:(fileUuid:string)=>set((state)=>({
        ...state,
        fileUuid
    }))
}));

export default useFileStore;