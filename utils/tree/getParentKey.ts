import { CustomDataNode } from "../../global/interfaces/app.interface";

const GetParentKey = (key:string,tree:CustomDataNode[]):string => {
    let parentKey:string;
    for(let i=0;i<tree.length;i++){
        const node = tree[i];
        if(node.children){
            if(node.children.some(item=>item.key===key)){
                parentKey = node.key as string;
            }else if(GetParentKey(key,node.children)){
                parentKey = GetParentKey(key,node.children);
            }
        }
    }
    return parentKey!
}
export default GetParentKey