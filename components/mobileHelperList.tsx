import { Button, Collapse } from 'antd';
import { TextHelper } from './helper/common/textHelper';
import { AutoZoomHelper } from './helper/camera/autoZoomHelper';
import { PositionMoveHelper } from './helper/camera/positionMoveHelper';
import { TargetMoveHelper } from './helper/camera/targetMoveHelper';
import { AmbientLightHelper } from './helper/light/ambientLight';
import { PointLightHelper } from './helper/light/pointLightHelper';
import { SpotLightHelper } from './helper/light/spotLight';
import { PositionHelper } from './helper/action/positionHelper';
import { RotationHelper } from './helper/action/rotationHelper';
import { ScaleHelper } from './helper/action/scaleHelper';
import { VisibleHelper } from './helper/action/visibleHelper';
import { ColorHelper } from './helper/action/colorHelper';
import { useMemo, useState } from 'react';
import { Color, Euler, Material, Mesh, Vector3 } from 'three';
import { PositionAnimationHelper } from './helper/animation/positionAniHelper';
import { ScaleAnimationHelper } from './helper/animation/scaleAniHelper';
import { RotationAnimationHelper } from './helper/animation/rotationAniHelper';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { useCommonSWR } from '../swrs/common.swr';
import { useMeshSWR } from '../swrs/mesh.swr';

interface IMobileHelperList{
    onControl:Function;
}

export const MobileHelperList=({onControl}:IMobileHelperList)=>{
    
    const {setMobileHelper}= useCommonSWR();
    const {commonState}=useCommonSWR();
    const {meshState}=useMeshSWR();

    const [position,setPosition]=useState<Vector3>(new Vector3());
    const [rotation,setRotation]=useState<Euler>(new Euler());
    const [scale,setScale]=useState<Vector3>(new Vector3());
    const [visible,setVisible]=useState<boolean>(false)
    const [color,setColor]=useState<string>("#ffffff");


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
            // setColor((result![result!.length-1].material as any).color);
        }
        return result;
    },[meshState?.selectMesh])
    
    const setPositionEvent =(positionProps:Vector3)=>{
        setPosition(positionProps);
        meshList?.forEach((mesh)=>{
            // const meshPosition = mesh.worldToLocal(position);
            mesh.position.set(positionProps.x,positionProps.y,positionProps.z);
        })
    }

    const setRotationEvent = (rotationProps:Euler)=>{
        setRotation(rotationProps);
        meshList?.forEach((mesh)=>{
            // const meshPosition = mesh.worldToLocal(position);
            mesh.rotation.set(rotationProps.x,rotationProps.y,rotationProps.z);
        })
    }
    const setColorEvent = (colorProps:string)=>{
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

    const setScaleEvent = (scaleProps:Vector3)=>{
        setScale(scaleProps);
        meshList?.forEach((mesh)=>{
            // const meshPosition = mesh.worldToLocal(position);
            mesh.scale.set(scaleProps.x,scaleProps.y,scaleProps.z);
        })
    }

    const onClickEvent=(Event:Function)=>{
        Event();
        onControl();
    }
    
    const {Panel}=Collapse;
    return(
        <div className="h-full block col-span-2 overflow-y-auto">
            <Collapse>
                <Panel key={1} header={'Common'}>
                    <Button block={true} className="mb-2" onClick={()=>{
                        onClickEvent(()=>{setMobileHelper(<TextHelper/>)})
                        }}>Text</Button>
                </Panel>
                <Panel key={2} header={'Camera'}>
                    <Button block={true} className="mb-2" onClick={()=>{
                         onClickEvent(()=>{setMobileHelper(<AutoZoomHelper/>)})
                        }}>AutoZoom</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                         onClickEvent(()=>{setMobileHelper(<PositionMoveHelper/>)})
                        }}>Position Move</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                         onClickEvent(()=>{setMobileHelper(<TargetMoveHelper/>)})
                        }}>Target Move</Button>
                </Panel>
                <Panel key={3} header={'Light'}>
                    <Button block={true} className="mb-2" onClick={()=>{
                         onClickEvent(()=>{setMobileHelper(<AmbientLightHelper/>)})
                        }}>AmbientLight</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                         onClickEvent(()=>{setMobileHelper(<PointLightHelper/>)})
                        }}>PointLight</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                         onClickEvent(()=>{setMobileHelper(<SpotLightHelper/>)})
                        }}>SpotLight</Button>
                </Panel>
                <Panel key={4} header={'Action'}>
                    <Button block={true} className="mb-2" onClick={()=>{
                        if(meshList?.length!<=0) return false
                        else onClickEvent(()=>setMobileHelper(<PositionHelper position={position} setPosition={setPositionEvent}/>))
                        }}>Position</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                        if(meshList?.length!<=0) return false
                        else onClickEvent(()=>setMobileHelper(<RotationHelper rotation={rotation} setRotation={setRotationEvent}/>))
                        }}>Rotation</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                        if(meshList?.length!<=0) return false
                        else onClickEvent(()=> setMobileHelper(<ScaleHelper scale={scale} setScale={setScaleEvent}/>))  
                        }}>Scale</Button>
                    {/* <Button onClick={()=>setMobileHelper(<VisibleHelper/>)}>Visible</Button> */}
                    <Button block={true} className="mb-2" onClick={()=>{
                        if(meshList?.length!<=0) return false
                        else onClickEvent(()=>setMobileHelper(<ColorHelper color={color} setColor={setColorEvent}/>))
                        }}>Color</Button>
                </Panel>
                <Panel key={5} header={'Animation'}>
                    <Button block={true} className="mb-2" onClick={()=>{
                        if(meshList?.length!<=0) return false
                        else onClickEvent(()=>setMobileHelper(<PositionAnimationHelper position={position}/>))
                        }}>Position</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                         if(meshList?.length!<=0) return false
                         else onClickEvent(()=>setMobileHelper(<RotationAnimationHelper/>))
                    }}>Rotation</Button>
                    <Button block={true} className="mb-2" onClick={()=>{
                        if(meshList?.length!<=0) return false
                        else onClickEvent(()=> setMobileHelper(<ScaleAnimationHelper scale={scale}/>))
                    }}>Scale</Button>
                    {/* <Button onClick={()=>setMobileHelper(TextHelper)}>Rotation</Button>
                    <Button onClick={()=>setMobileHelper(TextHelper)}>Scale</Button> */}
                </Panel>
            </Collapse>
        </div>

    )
}