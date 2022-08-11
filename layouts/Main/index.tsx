import { Suspense, useEffect, useState } from "react";
import DarkModeSwitch from "../../components/darkModeSwitch";
import FileDragArea from "./file-drag-area";
import MiniControls from "../../components/mini-remocorn";
import DragAndDropArea from "./modal-drag-area";
import Remocorn from "../../components/remocorn";
import TreeList from "../../components/tree-list";
import useIsMobile from "../../hooks/useIsMobile";
import { useCommonSWR } from "../../swrs/common.swr";
import { CanvasComponent } from "../../wegGL-components/canvas";
import Header from "../Header/header";
import LoadingComponent from "./loading";
import Guide from "./guide";
import { useCameraSWR } from '../../swrs/camera.swr';
import { useMeasureSWR } from '../../swrs/measure.swr';
import DeleteKeyPress from "../../hooks/useKeyPress";


const Main = () => {
  const {commonState}=useCommonSWR()
  const {cameraState,setOnZoom}=useCameraSWR()
  const {measureState,deleteSelectMeasure}=useMeasureSWR()

  const isMobile=useIsMobile()
  
  const [loadingPercent,setLoadingPercent]=useState<number>(0)
  const [loadingComplete,setLoadingComplete]=useState<boolean>(true);
  // const deleteMeasure=()=>{

  //  deleteSelectMeasure()
  // }

  DeleteKeyPress(deleteSelectMeasure)

  return (  
      <FileDragArea>
         <header className='w-full h-11 grid '>
            <Header/>
          </header>
        <main className="h-full">
          <div className={`w-full h-full grid absolute 
          ${measureState?.onMeasure&&` cursor-crosshair`}
          `} >
              <Suspense fallback={null}>
                <CanvasComponent setLoadingComplete={setLoadingComplete} setLoadingPercent={setLoadingPercent}/>
              </Suspense>
          </div>
          <DragAndDropArea>
          {commonState?.fileLoad?(
             <>
             {!isMobile&&(
              <>
                <TreeList/>
                <Remocorn/>
              </>
             )}
              <MiniControls/>
            </>
            ):(
              <div className='absolute top-[40%] left-[50%] z-30
               translate-x-[-50%]
               translate-y-[-50%]
              '>
                <Guide setLoadingComplete={setLoadingComplete}/>
              </div>
            )
            }
              <div className={`fixed right-5 bottom-5 w-auto z-20`}>
                <DarkModeSwitch/>
              </div>
          </DragAndDropArea>
          {!loadingComplete&&(
          <LoadingComponent/>
           )} 
        </main>
      </FileDragArea>
  )
}


export default Main
