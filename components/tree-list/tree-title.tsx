import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { Box3, Group, Mesh } from "three";
import { TitleProps } from "../../global/interfaces/tree.interface";
import { useCameraSWR } from "../../swrs/camera.swr";
import { useCommonSWR } from '../../swrs/common.swr';
import { useMeshSWR } from '../../swrs/mesh.swr';

const TreeTitle =({
    node,
    // visibleChange,
    iconClickEvent,
    clickEvent,
    doubleClickEvent
}:TitleProps):ReactNode=>{  


    return(
        <div
        className=" font-medium overflow-hidden w-full flex items-center"
         key={node.key}>
             <FontAwesomeIcon
                  icon={['fas','eye']}
                  onClick={(e)=>iconClickEvent(e,node.key,node.visible)}
                  className={`w-5 h-5
                  ${node.visible?`text-black`:`text-gray-300`}
                  `}/>
             <div className={`
              ${node.select?`bg-slate-500`:`bg-none`}
             `}
             onClick={(e)=>node.type!=='Bone'&&clickEvent(e,node.key)}
             onDoubleClick={()=>node.type!=='Bone'&&doubleClickEvent(node.key)}
             >
                {node.title as React.ReactNode}
             </div>
        </div>
    )
}
export default TreeTitle