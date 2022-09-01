import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { TitleProps } from "../../global/interfaces/tree.interface";
import {faEye} from '@fortawesome/free-solid-svg-icons'

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
                  icon={faEye}
                  size='1x'
                  onClick={(e)=>iconClickEvent(e,node.key,node.visible)}
                  className={`mr-1
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