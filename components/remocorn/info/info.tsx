import { MutableRefObject, useEffect, useState } from "react";
import { Mesh } from "three";
import { mergeVertices } from "three-stdlib";
import { Helper } from "../../../global/interfaces/app.interface";
import useFileStore from "../../../store/file.store";
import useMeshStore, { useSelectMehsStore } from "../../../store/mesh.store";
import NumberWithComma from "../../../utils/numberWithCommas";


type MeshInfoType={
    name:string;
    vertex:string;
    triangle:string;
    // x:string;
    // y:string;
    // z:string;

}


const InfoHelper=({}:Helper)=>{

    const fileInfo=useFileStore((state)=>state.fileInfo)
    const selectMesh = useSelectMehsStore((state)=>state.selectMesh)

    const [meshInfo,setMeshInfo]=useState<MeshInfoType>()

    const onAllMesh=()=>{
    
        setMeshInfo({
            name:fileInfo?.originName!,
            vertex:'-',
            triangle:'-',
            // x:'0',
            // y:'0',
            // z:'0'
        })
    }
    const onSelectMesh=()=>{

        const mesh = selectMesh?.current as Mesh

        setMeshInfo({
            name:mesh.name===''?'(no name)':mesh.name,
            vertex:NumberWithComma(mesh.geometry.attributes.position.count+''),
            triangle:NumberWithComma(mesh.geometry.attributes.position.count/3+'') ,
            // x:NumberWithComma(mesh.geometry.boundingBox?.max?.x!-mesh.geometry.boundingBox?.min.x!+''),
            // y:NumberWithComma(mesh.geometry.boundingBox?.max?.y!-mesh.geometry.boundingBox?.min.y!+''),
            // z:NumberWithComma(mesh.geometry.boundingBox?.max?.z!-mesh.geometry.boundingBox?.min.z!+'')
        })
    }

    useEffect(()=>{

        selectMesh?onSelectMesh():onAllMesh()
    },[selectMesh]);
    
    return(
        <div className="w-full h-full px-2 grid select-none
            ">
                <div className="block h-full">
                    <div className=" float-left">Name</div>
                    <div className=" float-right">{meshInfo?.name}</div>
                </div>
                <div className="block h-full">
                    <div className=" float-left">Vertices</div>
                    <div className=" float-right">{meshInfo?.vertex}</div>
                </div>
                <div className="block h-full">
                    <div className=" float-left">Triangles</div>
                    <div className=" float-right">{meshInfo?.triangle}</div>
                </div>
                {/* <div className="block h-full">
                    <div className=" float-left">X</div>
                    <div className=" float-right">{meshInfo?.x}</div>
                </div>
                <div className="block h-full">
                    <div className=" float-left">Y</div>
                    <div className=" float-right">{meshInfo?.y}</div>
                </div>
                <div className="block h-full">
                    <div className=" float-left">Z</div>
                    <div className=" float-right">{meshInfo?.z}</div>
                </div> */}
            </div>
    )
}
export default InfoHelper;