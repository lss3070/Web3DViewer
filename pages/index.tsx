
import type { NextPage } from 'next'
import { Suspense, useEffect, useRef, useState } from 'react'
import { TopMenu } from '../components/topMenu'
import TreeList from '../components/treeList'
import { CanvasComponent } from '../wegGL-components/canvas'
import Remocorn from '../components/remocorn/remocorn'
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons'
import LoadingComponent from '../components/Loading';
import MiniControls from '../components/mini-control'
import { useMenuSWR } from '../swrs/menu.swr';
import DarkModeSwitch from '../components/darkModeSwitch'
import { useCommonSWR } from '../swrs/common.swr';
import { useMeshSWR } from '../swrs/mesh.swr';
import React from 'react'
import Portal from '../HOC/portal'
import Guide from '../components/guide'
import { motion } from 'framer-motion'
import useIsMobile from '../hooks/useIsMobile'
import ModalDragArea from '../components/modal-drag-area'
import FileDragArea from '../components/file-drag-area'

library.add(fab,far,fas);

const Home: NextPage = () => {
  const { menuState,setDragArea} =useMenuSWR();
  const {commonState}=useCommonSWR()

  const isMobile=useIsMobile()
  
  const [loadingPercent,setLoadingPercent]=useState<number>(0)
  const [loadingComplete,setLoadingComplte]=useState<boolean>(true);

  // const [dragRef]=useRef<HTMLDivElement>(null);

  return (  
      <FileDragArea>
        <main>
          <div className='w-full h-11 grid'>
            <TopMenu/>
          </div>
          <div className={`w-full h-full grid absolute`}>
              <Suspense fallback={null}>
                <CanvasComponent setLoadingComplete={setLoadingComplte} setLoadingPercent={setLoadingPercent}/>
              </Suspense>
          </div>
          <ModalDragArea>
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
              <div className='absolute right-5 bottom-5 w-auto z-20'>
                <DarkModeSwitch/>
              </div>
          </ModalDragArea>
          {!loadingComplete&&(
          <LoadingComponent/>
           )} 
        </main>
      </FileDragArea>
  )
}


export default Home
