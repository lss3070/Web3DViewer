import { Box3, Mesh, Vector3 } from "three";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {Button} from 'antd'
import { useMeshSWR } from "../../../swrs/mesh.swr";
import { useCameraSWR } from "../../../swrs/camera.swr";

export const AutoZoomHelper=()=>{
    
    const {meshState}=useMeshSWR()
    const {cameraState,setTarget,setSelectMeshBox}=useCameraSWR();//setbox바궈

    const [onZooming,setOnZooming]=useState<boolean>(false);

    const AutoZoomEvent=()=>{
        // const mesh =  commonState?.scene.current.getObjectByProperty('uuid',meshState?.uuid);
    
        setOnZooming(true);
        if(meshState?.selectMesh.length!>=0){
            const mesh = meshState?.selectMesh[meshState.selectMesh.length-1]!;
            
            // setSphere(mesh.current.geometry.boundingSphere)

            const sphere= (mesh.current as Mesh).geometry.boundingSphere;
            
            console.log(sphere);
            const localToworld1= mesh.current.localToWorld(new Vector3(0,0,0))
            console.log('localToworld1');
            console.log(localToworld1);
            // const localToworld2= mesh.current.children[0].localToWorld(new Vector3(0,0,0))
            console.log(mesh.current);
            // console.log(localToworld1);
            // console.log(localToworld2);
            // console.log(mesh.position);
            // console.log(mesh.children[0].position);

    

            setSelectMeshBox(new Box3().setFromObject(mesh.current))
        }else{
            alert('잘못된 선택입니다.');
        }
    }
    return(
        <>
            <Button onClick={()=>AutoZoomEvent()}>
                Zoom
            </Button>
          {/* <button onClick={()=>AutoZoomEvent()}>button</button> */}
        </>
    )
}