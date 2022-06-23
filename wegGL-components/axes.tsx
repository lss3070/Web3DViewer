import { TrackballControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useCameraSWR } from '../swrs/camera.swr';

const Axes=()=>{
    const {cameraState}=useCameraSWR()


    const control = useRef<any>();
    const as=useRef<any>();
    

    useEffect(()=>{
        if(control){
            control.current?.object.position.set(
                cameraState?.position.x,
                10,
                5
                )
        }
    },[cameraState?.position])

    return(
        <Canvas style={{position:"absolute",left:'0',bottom:'0',width:'100px',height:'100px',
                zIndex:20}}>     
                <scene>
                    <axesHelper args={[10000]} ref={as} />
                    <TrackballControls 
                    onChange={(e)=>{
                        console.log(e?.target.object.position)
                    }}
                    ref={control}
                    noZoom={true}
                    noPan={false}/>
                </scene>
        </Canvas>
    )
}

export default Axes;