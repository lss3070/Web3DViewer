import { Suspense, useState } from "react";
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


const Main = () => {
  const {commonState}=useCommonSWR()
  const {cameraState,setOnZoom}=useCameraSWR()

  const isMobile=useIsMobile()
  
  const [loadingPercent,setLoadingPercent]=useState<number>(0)
  const [loadingComplete,setLoadingComplte]=useState<boolean>(true);

  console.log('ismobile');
  console.log(isMobile);
  return (  
      <FileDragArea>
        <main>
          <div className='w-full h-11 grid '>
            <Header/>
          </div>
          <div className={`w-full h-full grid absolute`} >
              <Suspense fallback={null}>
                <CanvasComponent setLoadingComplete={setLoadingComplte} setLoadingPercent={setLoadingPercent}/>
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
                <Guide/>
              </div>
            )
            }
              <div className='absolute right-5 bottom-5 w-auto z-20 qweqwe'>
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
