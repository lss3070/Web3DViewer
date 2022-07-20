import { SkinnedMesh } from "three"

interface ISkinnedMeshProps{
    skinnedMeshItem:SkinnedMesh
}

const SkinnedMeshComponent=({skinnedMeshItem}:ISkinnedMeshProps)=>{
    return(

    //     <skinnedMesh
    //     material={skinnedMeshItem.material}
    //     geometry={skinnedMeshItem.geometry}
    //     skeleton={skinnedMeshItem.skeleton}
    //   />

        <skinnedMesh {...skinnedMeshItem}>
        </skinnedMesh>
    )
}
export default SkinnedMeshComponent