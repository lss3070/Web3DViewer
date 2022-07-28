import { CustomDataNode } from "../../global/interfaces/app.interface";

//visible 재귀함수
const visibleChangeLoop=(key:string|number,
    tree:CustomDataNode,
    value?:boolean)=>{
            if(tree.key===key){
                tree.visible=value?value:!tree.visible;
                if(tree.children){
                    for(let i=0;i<tree.children.length;i++){
                        tree.children[i]= visibleChangeLoop(tree.children[i].key,
                            tree.children[i],tree.visible) as CustomDataNode
                    }
                }
            }else{
                if(tree.children){
                    for(let i=0;i<tree.children.length;i++){
                        tree.children[i]= visibleChangeLoop(key,
                            tree.children[i],value) as CustomDataNode
                    }
                }
            }
            return tree;
}
export default visibleChangeLoop