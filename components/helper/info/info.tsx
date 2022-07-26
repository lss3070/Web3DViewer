import { MutableRefObject, useEffect, useState } from "react";
import { Mesh } from "three";
import { mergeVertices } from "three-stdlib";
import { Helper } from "../../../interfaces/app.interface";
import { useCommonSWR } from "../../../swrs/common.swr";
import { useMeshSWR } from "../../../swrs/mesh.swr";


type MeshInfoType={
    name:string;
    vertex:number;
    triangle:number;
    x:number;
    y:number;
    z:number;

}


const InfoHelper=({}:Helper)=>{

    const {commonState}=useCommonSWR()
    const {meshState}=useMeshSWR();

    const [meshInfo,setMeshInfo]=useState<MeshInfoType>()

    const onAllMesh=()=>{
    
        setMeshInfo({
            name:commonState?.fileInfo?.originName!,
            vertex:0,
            triangle:0,
            x:0,
            y:0,
            z:0
        })
    }
    const onSelectMesh=()=>{

        const mesh = meshState?.selectMesh?.current as Mesh

        setMeshInfo({
            name:mesh.name,
            vertex:mesh.geometry.attributes.position.count,
            triangle:mesh.geometry.attributes.position.count/3,
            x:mesh.geometry.boundingBox?.max?.x!-mesh.geometry.boundingBox?.min.x!,
            y:mesh.geometry.boundingBox?.max?.y!-mesh.geometry.boundingBox?.min.y!,
            z:mesh.geometry.boundingBox?.max?.z!-mesh.geometry.boundingBox?.min.z!
        })
    }

    useEffect(()=>{

        meshState?.selectMesh?onSelectMesh():onAllMesh()
    },[meshState?.selectMesh]);
    
    return(
        <div className="w-full h-full px-2
            ">
                <div className="flex gap-5">
                    <div>Name</div>
                    <div>{meshInfo?.name}</div>
                </div>
                <div className="flex gap-5">
                    <div>Vertices</div>
                    <div>{meshInfo?.vertex}</div>
                </div>
                <div className="flex gap-5">
                    <div>Triangles</div>
                    <div>{meshInfo?.triangle}</div>
                </div>
                <div className="flex">
                    <div>X</div>
                    <div>{meshInfo?.x}</div>
                </div>
                <div className="flex">
                    <div>Y</div>
                    <div>{meshInfo?.y}</div>
                </div>
                <div className="flex">
                    <div>Z</div>
                    <div>{meshInfo?.z}</div>
                </div>
            </div>
    )
}
export default InfoHelper;