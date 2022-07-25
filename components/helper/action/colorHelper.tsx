import { useState, useEffect } from 'react';
import {HexColorPicker} from 'react-colorful'
import { Material } from 'three';
import { Helper } from '../../../interfaces/app.interface';
import { useMeshSWR } from '../../../swrs/mesh.swr';


interface IColorHelperProps extends Helper{
    color:string;
    setColor:Function
}

export const ColorHelper=({color,setColor}:IColorHelperProps)=>{

    const {meshState,setSelectMesh}=useMeshSWR()

    const [materialList,setMaterialList]=useState<Material[]>()

    useEffect(()=>{
        console.log('color!');
        console.log(meshState?.selectMesh);

        meshState?.selectMesh
    },[meshState?.selectMesh])
    
    return(
        <div>

        <div></div>
            <div className='flex items-center justify-center w-full'>
                <HexColorPicker color={color} 
                    onChange={(color)=>{
                        setColor(color);
                    }}/>
            </div>
        </div>

    )
}