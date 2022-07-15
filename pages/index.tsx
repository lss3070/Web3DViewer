
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

library.add(fab,far,fas);

const Home: NextPage = () => {
  const { menuState,setDragArea} =useMenuSWR();
  const {commonState}=useCommonSWR()
  const dragArea = useRef<HTMLDivElement>(null)
  
  const [loadingPercent,setLoadingPercent]=useState<number>(0)
  const [loadingComplete,setLoadingComplte]=useState<boolean>(true);
  const [helperVisible,sethelperVisible]=useState<boolean>(false);

  useEffect(()=>{
    setDragArea(dragArea);
  },[dragArea])

  return (  
    <>
      <div className="w-full h-full grid fixed">
        <main>

          <div className='w-full h-11 grid'>
            <TopMenu/>
          </div>
          <div className={`w-full h-full  grid`}>
              <Suspense fallback={null}>
                <CanvasComponent setLoadingComplete={setLoadingComplte} setLoadingPercent={setLoadingPercent}/>
              </Suspense>
          </div>
          <div 
          ref={dragArea}
          className='absolute top-[5%] left-0  w-full h-[95%]'>
            {commonState?.fileLoad&&
              <>
                <TreeList/>
                <Remocorn/>
                <MiniControls/>
              </>
            }
              <div className='absolute right-5 bottom-5 w-auto z-20'>
                <DarkModeSwitch/>
              </div>
          </div>
          {!loadingComplete&&(
          <LoadingComponent/>
          )}
        </main>
      </div>
    </>
  )
}

export default Home
