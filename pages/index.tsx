import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import { TopMenu } from '../components/topMenu'
import { TreeListComponent } from '../components/treeList'
import { useCommonSWR } from '../swrs/common.swr'
import { useMeshSWR } from '../swrs/mesh.swr'
import { CanvasComponent } from '../wegGL-components/canvas'

import CustomLayout from '../components/remocorn'

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons'
import LoadingComponent from '../components/Loading';
import MiniControls from '../components/mini-control'
import { useMenuSWR } from '../swrs/menu.swr';



library.add(fab,far,fas)
const Home: NextPage = () => {
  const { menuState} =useMenuSWR()
  
  const [loadingPercent,setLoadingPercent]=useState<number>(0)
  const [loadingComplete,setLoadingComplte]=useState<boolean>(true);
  const [helperVisible,sethelperVisible]=useState<boolean>(false);

  return (
    <div className="w-full h-full grid ">
      <main>
        <div className='w-full h-[5%]'>
          <TopMenu/>
        </div>
        <div className={`w-full h-[95%] grid`}>
                <Suspense fallback={null}>
                    <CanvasComponent setLoadingComplete={setLoadingComplte} setLoadingPercent={setLoadingPercent}/>
                </Suspense>
        </div>
        <div className='absolute top-[5%] left-0  w-full h-[95%] '>
          {menuState?.OnTreeList&&(<TreeListComponent/>)}
          {menuState?.OnControl&&(<CustomLayout/>)}
          <MiniControls/>
        </div>
      </main>
      {!loadingComplete&&(
        <LoadingComponent/>
      )}
    </div>
  )
}

export default Home
