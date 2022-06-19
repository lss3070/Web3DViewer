import ModalLayout from "./modal-layout";
import { useMenuSWR } from '../swrs/menu.swr';
import { useMeshSWR } from '../swrs/mesh.swr';
import { MutableRefObject, useEffect, useState } from 'react';
import { Mesh } from "three";
import { Geometry, mergeVertices } from "three-stdlib";

type MeshInfoType={
    name:string;
    vertex:number;
    triangle:number;
    x:number;
    y:number;
    z:number;

}

const MeshInfo=()=>{

    const {menuState}=useMenuSWR();
    const {meshState}=useMeshSWR();

    const [meshInfo,setMeshInfo]=useState<MeshInfoType>()
    

    useEffect(()=>{
        
        let vertex=0;
        let name=meshState?.selectMesh?.length!>0?
        `${meshState?.selectMesh[0].current.name} 외 ${meshState?.selectMesh?.length!-1}`
        :``
        let triangle=0
        let x =0;
        let y=0;
        let z=0;
       

        meshState?.selectMesh.map((item)=>{
            
            const mesh = item as MutableRefObject<Mesh>
            console.log(mesh)
            const merge= mergeVertices(mesh.current.geometry);
            vertex+=merge.attributes.position.count
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

    },[meshState?.selectMesh]);

    return(
        <ModalLayout type="Detail" 
        onModal={menuState?.control.on!}
        >
            <div className="rounded-lg
                       bg-gray-200
                       dark:bg-slate-600
                        
            ">
                <div>
                    <div>Name</div>
                    <div>{meshInfo?.name}</div>
                </div>
                <div>
                    <div>Vertices</div>
                    <div>{meshInfo?.vertex}</div>
                </div>
                <div>
                    <div>Triangles</div>
                    <div>{meshInfo?.triangle}</div>
                </div>
                <div>
                    <div>X</div>
                    <div>{meshInfo?.x}</div>
                </div>
                <div>
                    <div>Y</div>
                    <div>{meshInfo?.y}</div>
                </div>
                <div>
                    <div>Z</div>
                    <div>{meshInfo?.z}</div>
                </div>

            </div>
            
        </ModalLayout>
    )
}
export default MeshInfo;