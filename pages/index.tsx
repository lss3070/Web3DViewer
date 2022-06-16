import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Suspense, useEffect, useRef, useState } from 'react'
import { TopMenu } from '../components/topMenu'
import TreeList from '../components/treeList'
import { useCommonSWR } from '../swrs/common.swr'
import { useMeshSWR } from '../swrs/mesh.swr'
import { CanvasComponent } from '../wegGL-components/canvas'

import Remocorn from '../components/remocorn'

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons'
import LoadingComponent from '../components/Loading';
import MiniControls from '../components/mini-control'
import { useMenuSWR } from '../swrs/menu.swr';
import ModalLayout from '../components/modal-layout'
import DarkModeSwitch from '../components/darkModeSwitch'
import { motion } from 'framer-motion'



library.add(fab,far,fas)
const Home: NextPage = () => {
  const { menuState,setDragArea} =useMenuSWR();
  const dragArea = useRef<HTMLDivElement>(null)
  
  const [loadingPercent,setLoadingPercent]=useState<number>(0)
  const [loadingComplete,setLoadingComplte]=useState<boolean>(true);
  const [helperVisible,sethelperVisible]=useState<boolean>(false);

  useEffect(()=>{
    setDragArea(dragArea);
  },[dragArea])

  return (
    <div className="w-full h-full grid ">
      <main>
        <div className='w-full h-[5%] grid'>
          <TopMenu/>
        </div>
        <div className={`w-full h-[95%] grid`}>
                <Suspense fallback={null}>
                    <CanvasComponent setLoadingComplete={setLoadingComplte} setLoadingPercent={setLoadingPercent}/>
                </Suspense>
        </div>
        <motion.div 
        ref={dragArea}
        className='absolute top-[5%] left-0  w-full h-[95%]'>
            <TreeList/>
            <Remocorn/>
            <MiniControls/>
            <div className='absolute right-5 bottom-5 w-auto z-20'>
              <DarkModeSwitch/>
            </div>
        </motion.div>
  
       
      </main>
      {!loadingComplete&&(
        <LoadingComponent/>
      )}
    </div>
  )
}

export default Home
