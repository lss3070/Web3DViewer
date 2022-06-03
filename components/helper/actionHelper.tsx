import { Button, Col, Collapse, Row, Slider } from "antd"
import { useEffect, useMemo, useState } from 'react';
import { Color, Mesh, Object3D, Vector3, Euler } from 'three';
import { useFrame } from "@react-three/fiber";
import Material from 'three';
import { VisibleHelper } from "./action/visibleHelper";
import { PositionHelper } from "./action/positionHelper";
import { RotationHelper } from './action/rotationHelper';
import { ScaleHelper } from "./action/scaleHelper";
import { ColorHelper } from './action/colorHelper';
import { useMeshSWR } from "../../swrs/mesh.swr";
import { useCommonSWR } from "../../swrs/common.swr";


export const ActionHelperComponent=()=>{
    
    const {Panel}=Collapse
    const {meshState}=useMeshSWR()
    const {commonState}=useCommonSWR()
    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [rotation,setRotation]=useState<Euler>(new Euler());
    const [scale,setScale]=useState<Vector3>(new Vector3());
    const [visible,setVisible]=useState<boolean>(false)
    const [color,setColor]=useState<string>("#ffffff")

    let meshList = useMemo(()=>{
        const result:Mesh[]|undefined= meshState?.selectMesh!.map((ref)=>{
           const mesh= commonState?.scene.current.getObjectByProperty('uuid',ref.current.uuid)
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
        meshList?.forEach((mesh)=>{
            // const meshPosition = mesh.worldToLocal(position);
            mesh.position.set(positionProps.x,positionProps.y,positionProps.z);
        })
    }
    const rotationChangeEvent=(rotationProps:Euler)=>{
        setRotation(rotationProps);
        meshList?.forEach((mesh)=>{
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

    return(
        <Collapse>
            <Panel header="Action" key="3">
                {/* position */}
                <Collapse>
                    <Panel header="Position" key="1">
                        <PositionHelper position={position} setPosition={positionChangeEvent}/>
                    </Panel>
                </Collapse>
                {/* rotation */}
                <Collapse>
                    <Panel header="Rotation"key="1">
                        <RotationHelper rotation={rotation} setRotation={rotationChangeEvent}/>
                    </Panel>
                </Collapse>
                {/* scale */}
                <Collapse>
                    <Panel header="Scale" key="1">
                        <ScaleHelper scale={scale} setScale={scaleChangeEvent}/>
                    </Panel>
                </Collapse>
                {/* visible */}
                <Collapse>
                    <Panel header="Visible" key="1">
                        <VisibleHelper 
                        meshList={meshList!} 
                        visible={visible} 
                        setVisible={setVisible}/>
                    </Panel>
                </Collapse>
                {/* color */}
                <Collapse>
                    <Panel header="Color" key="1">
                        <Row  justify={"center"}>
                            <ColorHelper color={color} setColor={colorChangeEvent}/>
                        </Row>
                    </Panel>
                </Collapse>
            </Panel>
        </Collapse>
    )
}