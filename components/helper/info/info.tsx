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
        let vertex=0;
        let name=meshState?.selectMesh?.length!>1?
        `${meshState?.selectMesh[0].current.name} 외 ${meshState?.selectMesh?.length!-1}`
        :`${meshState?.selectMesh[0].current.name}`
        let triangle=0
        let x =0;
        let y=0;
        let z=0;

        meshState?.selectMesh.map((item)=>{
            console.log(item);
            const mesh = item as MutableRefObject<Mesh>
            const merge= mergeVertices(mesh.current.geometry);
            vertex+=mesh.current.geometry.attributes.position.count
            // vertex+=merge.attributes.position.count
            triangle+=mesh.current.geometry.attributes.position.count/3
            x+=Math.abs(mesh.current.geometry.boundingBox?.max.x!-mesh.current.geometry.boundingBox?.min.x!)
            y+=Math.abs(mesh.current.geometry.boundingBox?.max.y!-mesh.current.geometry.boundingBox?.min.y!)
            z+=Math.abs(mesh.current.geometry.boundingBox?.max.z!-mesh.current.geometry.boundingBox?.min.z!)
        });
        setMeshInfo({
            name,
            vertex,
            triangle,
            x,
            y,
            z
        })
    }

    useEffect(()=>{

        meshState?.selectMesh.length!>0?onSelectMesh():onAllMesh()
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