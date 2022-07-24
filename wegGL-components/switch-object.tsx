import { Bone, Group, Mesh, Object3D, SkinnedMesh } from "three";
import shortId from 'shortid';
import { MeshGroupComponent } from "./mesh-group";
import { MeshComponent } from "./mesh";

import SkinnedMeshComponent from "./skin-mesh";
import BoneComponent from "./bone";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

interface ISwitchObjectProps{
    objectList:Object3D<THREE.Event>[];
}

//temp 상단 컴포넌트 id
const SwitchObject=({objectList}:ISwitchObjectProps)=>{

    const [element,setElement]=useState<JSX.Element[]>()

    const {scene} = useThree();
    useEffect(()=>{
        const component= objectList.map((object,index)=>{
            switch(object.type){
                case 'Group':
                    return (<MeshGroupComponent 
                        key={index} 
                        meshGroup={object as Group}/>)
                case 'Mesh':
                    return (<MeshComponent  
                        key={index} 
                        mesh={object as Mesh}/>)
                case 'SkinnedMesh':
                    // return (<MeshComponent  
                    //     key={index} 
                    //     mesh={object as Mesh}/>)

                    return (<SkinnedMeshComponent  
                        key={index} 
                        skinnedMeshItem={object as SkinnedMesh}/>)
                case 'Bone':
                    return (
                    <primitive object={object}  />
                    // <BoneComponent key={index} object={object}/>
                    )
                case 'LineSegments':
                    return (<MeshComponent  
                        key={index} 
                        mesh={object as Mesh}/>)
                default:
                    return<></>
            }
        })

        setElement(component!)
    },[objectList])
    

    return(
        <>
            {
                element
            }
        </>

    )
}
export default SwitchObject