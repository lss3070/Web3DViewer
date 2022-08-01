import { GizmoHelper, GizmoViewcube, GizmoViewport, TrackballControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import { useCameraSWR } from '../swrs/camera.swr';
import {useState} from 'react';
import { Vector3 } from 'three';
import useWindowSize from '../hooks/useWindowSize';
import useIsMobile from '../hooks/useIsMobile';

const Gizmo=()=>{


    const isMobile = useIsMobile()

    const [margin,setMargin]=useState<number>(0)

    useEffect(()=>{
        isMobile?setMargin(70):setMargin(100)
    },[isMobile])

    return(
            <GizmoHelper 
            
            alignment={'bottom-left'} 
            margin={[margin,margin+20]} 
            autoClear={false} renderPriority={2}
            >
                <GizmoViewcube 
                color="white" 
                hoverColor="lightgray"
                faces={['Right', 'Left', 'Top', 'Bottom', 'Front', 'Back']}
                opacity={1}
                strokeColor={"gray"}
                textColor={"black"}
                />
            {/* <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor={'black'} /> */}
        </GizmoHelper>
    )
}

export default Gizmo;