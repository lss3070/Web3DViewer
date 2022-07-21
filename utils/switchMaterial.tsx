import { Material } from "three";

export const SwitchMaterial=(
    material:Material,
    wire:boolean,
    index?:number)=>{
    switch(material.type){
        case 'MeshPhysicalMaterial':
            return <meshPhysicalMaterial {...material} 
            wireframe={wire} 
             key={index?index:0}/>;
        case 'MeshStandardMaterial':
            return <meshStandardMaterial {...material} 
            wireframe={wire} 
             key={index?index:0}/>;
        case 'MeshToonMaterial':
            return <meshToonMaterial {...material}
             key={index?index:0}/>;
        case 'MeshNormalMaterial':
            return <meshNormalMaterial {...material} 
            wireframe={wire} 
            key={index?index:0}/>;
        case 'MeshDepthMaterial':
            return <meshDepthMaterial {...material} 
            wireframe={wire} 
             key={index?index:0}/>;
        case 'MeshDistanceMaterial':
            return <meshDistanceMaterial
            {...material} key={index?index:0}/>;
        case 'MeshBasicMaterial':
            return <meshBasicMaterial {...material} 
            wireframe={wire} 
            key={index?index:0}/>
        case 'MeshMatcapMaterial':
            return <meshMatcapMaterial {...material}  
            key={index?index:0}/>
        case 'MeshPhongMaterial':
            return <meshPhongMaterial {...material} 
            wireframe={wire}  
            key={index?index:0}/>
        case 'MeshLambertMaterial':
            return <meshLambertMaterial {...material}
            wireframe={wire}  
            key={index?index:0}/>
        default:
        return <meshBasicMaterial {...material} 
        wireframe={wire}
        />
    }
}
