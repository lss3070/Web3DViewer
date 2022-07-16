import { Group, Mesh, Object3D } from "three";
import { MeshComponent } from "./mesh";
import { MeshGroupComponent } from "./mesh-group";

interface IBoneProps{
    boneItems:Object3D<THREE.Event>
}

const BoneComponent=({boneItems}:IBoneProps)=>{
    
    const MeshSwitch=()=>{
        return boneItems.children.map((boneItem,index)=>{
            switch(boneItem.type){
                case 'Group':
                    return (<MeshGroupComponent key={index} meshGroup={boneItem as Group}/>)
                case 'Mesh':
                    return (<MeshComponent key={index} mesh={boneItem as Mesh}/>)
                case 'SkinnedMesh':
                    return (<MeshComponent key={index} mesh={boneItem as Mesh}/>)
                case 'Bone':
                    // return (  <BoneComponent bone={groupItem as Bone}/>)
                    return (<BoneComponent key={index} boneItems={boneItem}/>)
                case 'LineSegments':
                    return (<MeshComponent key={index} mesh={boneItem as Mesh}/>)
            }
        });
    }

    return(
        <bone position={boneItems.position}>
            {boneItems?MeshSwitch():<></>}
        </bone>
    )
}
export default BoneComponent