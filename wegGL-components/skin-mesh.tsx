import { SkinnedMesh } from "three"

interface ISkinnedMeshProps{
    skinnedMeshItem:SkinnedMesh
}

const SkinnedMeshComponent=({skinnedMeshItem}:ISkinnedMeshProps)=>{
    return(
        <skinnedMesh {...skinnedMeshItem}>

        </skinnedMesh>
    )
}
export default SkinnedMeshComponent