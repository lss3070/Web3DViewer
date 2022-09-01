import { Suspense, useEffect, useState } from "react";
import DarkModeSwitch from "../../components/darkModeSwitch";
import FileDragArea from "./file-drag-area";
import MiniControls from "../../components/mini-remocorn";
import DragAndDropArea from "./modal-drag-area";
import Remocorn from "../../components/remocorn";
import TreeList from "../../components/tree-list";
import useIsMobile from "../../hooks/useIsMobile";
import CanvasComponent  from "../../wegGL-components/canvas";
import Header from "../Header/header";
import LoadingComponent from "./loading";
import Guide from "./guide";
import DeleteKeyPress from "../../hooks/useKeyPress";
import useMeasureStore from '../../store/measure.store';
import useFileStore from "../../store/file.store";


const Main = () => {

  const [onMeasure,deleteSelectMeasure]=useMeasureStore(state=>[state.onMeasure,state.deleteMeasure])
  const fileLoad=useFileStore((state)=>state.fileLoad)

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
          ${onMeasure&&` cursor-crosshair`}
          `} >
                <CanvasComponent setLoadingComplete={setLoadingComplete} setLoadingPercent={setLoadingPercent}/>
          </div>
          <DragAndDropArea>
          {fileLoad?(
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
