export interface IFileTransform{
    originExtension:string;
    originName:string;
    originLink:string;
    fileMap:Map<string,File>;
}