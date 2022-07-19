import { Bone, Group, Mesh, Object3D, SkinnedMesh } from "three";
import shortId from 'shortid';
import { MeshGroupComponent } from "./mesh-group";
import { MeshComponent } from "./mesh";
import BoneComponent from "./bone";

interface ISwitchObjectProps{
    object:Object3D<THREE.Event>
}

const SwitchObject=({object}:ISwitchObjectProps)=>{
    return(
        <>
            {
                object.children.map((object,index)=>{
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
                            return (<MeshComponent  
                                key={index} 
                                mesh={object as SkinnedMesh}/>)
                        case 'Bone':
                            return (<BoneComponent  
                                key={index} 
                                bone={object as Bone}/>)
                        case 'LineSegments':
                            return (<MeshComponent  
                                key={index} 
                                mesh={object as Mesh}/>)
                    }
                })
            }
        </>

    )
}
export default SwitchObject