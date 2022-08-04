import { CustomDataNode } from "../../global/interfaces/app.interface";
import { CustomNode } from "../../global/interfaces/tree.interface";

const RenderLoop =(data:CustomDataNode[],searchValue:string):CustomNode[]=>{
    return data.map((item)=>{
        const index = item.title!.indexOf(searchValue)
        const beforeStr = item.title!.substr(0,index);
        const afterStr = item.title!.substr(index!+searchValue.length);

        const title= 
        index!>-1?
        (
            <span>
                {beforeStr}
                <span className=" text-red-500">{searchValue}</span>
                {afterStr}
            </span>
        ):(
            <span>{item.title}</span>
        );
        if(item.children){
            return {
                visible:item.visible,
                title:title,
                type:item.type,
                key:item.key,
                children:RenderLoop(item.children,searchValue),
                select:item.select,
            }
        }
        return {
            select:item.select,
            visible:item.visible,
            title:title, 
            key:item.key,
            type:item.type
        }
    })
}
export default RenderLoop