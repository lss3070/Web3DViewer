import { useState, useEffect } from 'react';
import {HexColorPicker} from 'react-colorful'
import {   Color, Material, Mesh } from 'three';
import { Helper } from '../../../global/interfaces/app.interface';
import { useMeshSWR } from '../../../swrs/mesh.swr';
import { isArray } from 'lodash';
import { SelectMeshComponent } from '../../../wegGL-components/outLineMesh';


interface MaterialInfo{
    name:string;
    uuid:string;
}

interface IColorHelperProps extends Helper{
    // color:string;
    // setColor:Function;
    // materialList:MaterialInfo[];
    // setMaterial:Function;
}

export const ColorHelper=(
     {
    // color,
    // setColor,
    // materialList,
    // setMaterial
}:IColorHelperProps
    )=>{

    const {meshState,setSelectMesh}=useMeshSWR()

    const [color,setColor] =useState<string>('#ffffff')
    const [materialList,setMaterialList]=useState<Material[]>([]);

    const [selectMaterial,setSelectMaterial]=useState<Material>();

    const InitMaterial=()=>{
        if(meshState?.selectMesh){
            const mesh = meshState?.selectMesh.current as Mesh
            
            isArray(mesh.material)? 
            setMaterialList(mesh.material)
            : setMaterialList([mesh.material])
        }
    }

    const colorChange=(color:string)=>{
        if(selectMaterial){
            (selectMaterial as any).color.set(color);
        }
    }

    useEffect(()=>{
        InitMaterial()
    },[meshState?.selectMesh])

    useEffect(()=>{
        InitMaterial()
    },[])

    useEffect(()=>{
        materialList&&setSelectMaterial(materialList[0]);
    },[materialList])


    return(
        <div className='flex'>
        {/* <div className=''>
            {materialList.map((item)=>{
                    return(
                        <div onClick={()=>setSelectMaterial(item)}>{item.name}</div>
                    )
                })}
        </div> */}
            <div className='flex items-center justify-center w-full'>
                <HexColorPicker color={color} 
                    onChange={colorChange}/>
            </div>
        </div>

    )
}