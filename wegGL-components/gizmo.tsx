import { GizmoHelper, GizmoViewcube, GizmoViewport, TrackballControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense, useEffect, useRef } from "react"
import { useCameraSWR } from '../swrs/camera.swr';
import {useState} from 'react';
import { Vector3 } from 'three';

const Gizmo=()=>{
    return(
            <GizmoHelper alignment={'bottom-left'} margin={[100,120]} 
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