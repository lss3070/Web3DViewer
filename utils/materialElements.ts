import { Material } from "three";
import { SwitchMaterial } from "./switchMaterial";

export const MaterialElements =(material:Material|Material[],wire:boolean)=>{

    if(Array.isArray(material)){
        return (material as Material[]).map((item,index)=>
            SwitchMaterial(item!,wire,index)
        )
    }else{
        return SwitchMaterial(material!,wire);
    }
}
