import { Bone, Group, Mesh, Object3D } from "three";
import { MeshComponent } from "./mesh";
import { MeshGroupComponent } from "./mesh-group";
import SwitchObject from "./switch-object";

interface IBoneProps{
    bone:Bone
}

const BoneComponent=({bone}:IBoneProps)=>{
    
    return(
        <bone 
        {...bone} 
        >
            {bone&&(
                <SwitchObject object={bone}/>
            )}
        </bone>
    )
}
export default BoneComponent