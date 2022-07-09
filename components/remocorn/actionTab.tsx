import { useMemo, useState } from "react"
import { BufferGeometry, Euler, Material, Mesh, Vector3 } from "three"
import { useCommonSWR } from "../../swrs/common.swr"
import { useMeshSWR } from "../../swrs/mesh.swr"
import { ColorHelper } from "../helper/action/colorHelper"
import { PositionHelper } from "../helper/action/positionHelper"
import { RotationHelper } from "../helper/action/rotationHelper"
import { ScaleHelper } from "../helper/action/scaleHelper"
import RemocornTab, { IRemocornTabItem } from "./remocornTab"


const ActionTab=()=>{
    const {meshState}=useMeshSWR()
    const {commonState}=useCommonSWR()
    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [rotation,setRotation]=useState<Euler>(new Euler());
    const [rotationAxis,setRotationAxis]=useState<Vector3>(new Vector3(0,0,0))
    const [scale,setScale]=useState<Vector3>(new Vector3());
    const [visible,setVisible]=useState<boolean>(false)
    const [color,setColor]=useState<string>("#ffffff")

    let meshList = useMemo(()=>{
        const result:Mesh<BufferGeometry, Material | Material[]>[]|undefined= 
        meshState?.selectMesh!.map((ref)=>{
           const mesh= commonState?.scene?.current?.getObjectByProperty('uuid',ref.current.uuid)! as Mesh
           return mesh
        })
        if(result&&result!.length>0){
            setPosition(result![result!.length-1].position);
            setRotation(result![result!.length-1].rotation);
            setScale(result![result!.length-1].scale)
            setVisible(result![result!.length-1].visible);
            setColor(`#${(result![result!.length-1].material as any).color.getHex()}`);
        }
        return result;
    },[meshState?.selectMesh])

    const positionChangeEvent=(positionProps:Vector3)=>{
        setPosition(positionProps);
        console.log(meshList);
        meshList?.forEach((mesh)=>{
            // const meshPosition = mesh.worldToLocal(position);
            mesh.position.set(positionProps.x,positionProps.y,positionProps.z);
        })
    }
    const rotationChangeEvent=(rotationProps:Euler,axis:Vector3)=>{
        setRotation(rotationProps);
        meshList?.forEach((mesh)=>{
            mesh.rotateOnAxis(new Vector3(0,0,0),0);
            mesh.rotation.set(rotationProps.x,rotationProps.y,rotationProps.z)
        })
    }
    const scaleChangeEvent=(scaleProps:Vector3)=>{
        setScale(scaleProps);
        meshList?.forEach((mesh)=>{
            mesh.scale.set(scaleProps.x,scaleProps.y,scaleProps.z)
        })
    }
    const colorChangeEvent=(colorProps:string)=>{
        setColor(colorProps);
        meshList?.forEach((mesh)=>{
            // const meshPosition = mesh.worldToLocal(position);
            if(Array.isArray(mesh.material)){
                mesh.material.map((item)=>{
                    (item as any).color.set(colorProps);
                })
            }else{
                
                (mesh.material as any).color.set(colorProps);
            }
            // mesh.material
            // mesh.rotation.set(rotationProps.x,rotationProps.y,rotationProps.z))
       })  
    }

    const tabList:IRemocornTabItem[]=[
        {
            label:'Position',
            index:0,
            content:<PositionHelper
            position={position} setPosition={positionChangeEvent}
            />
        },
        {
            label:'Rotate',
            index:1,
            content:<RotationHelper
            rotation={rotation} 
            rotationAxis={rotationAxis}
            setRotation={rotationChangeEvent}
            />
        },
        {
            label:'Scale',
            index:2,
            content:<ScaleHelper
            scale={scale} setScale={scaleChangeEvent}
            />
        },
        {
            label:'Color',
            index:3,
            content:<ColorHelper
            color={color} setColor={colorChangeEvent}
            />
        }
    ]

    return(
        <RemocornTab tabList={tabList}/>
    )
}
export default ActionTab