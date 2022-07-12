import { Html } from "@react-three/drei"
import { useMemo } from "react"
import { Group, Vector3 } from "three"

interface IMeshGroupHtmlProps{
    meshGroup:Group
}

const MeshGroupHtml=()=>{

    console.log('!!!!')
    // const ee=()=>{
    //     const list=[]
    //     meshGroup.children.map((item)=>{
    //         if(groupItem.type==='Group'){
    //             list.push(item);
    //         }
    //     })
    // }
    
    // const meshList=useMemo(()=>{
        
    // },[meshGroup])

    return(
        <Html 

        pointerEvents="none"
        className={'text-black'}
            // selected?'text-red-400':hovered?'text-orange-300':
        // commonState?.darkMode?`text-white`:`text-black`}
        sprite
        transform
        distanceFactor={100}
        position={new Vector3(0,2,7)}>
            {'testsetesttestsetest'}
        </Html>
    )
}

export default MeshGroupHtml