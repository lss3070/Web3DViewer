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

import { HelperListComponent } from '../components/helperList'
import { MobileHelperControl } from '../components/mobileHelperControl'
import { MobileHelperList } from '../components/mobileHelperList'
import CustomLayout from '../components/layout'

import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons'
import CameraPosition from '../components/cameraPosition'
import LoadingComponent from '../components/Loading';



library.add(fab,far,fas)
const Home: NextPage = () => {
  library.add(fab,far,fas)
  const { meshState}= useMeshSWR();
  const {commonState,setOnMobile} = useCommonSWR()

  
  const [loadingPercent,setLoadingPercent]=useState<number>(0)
  const [loadingComplete,setLoadingComplte]=useState<boolean>(true);
  const [helperVisible,sethelperVisible]=useState<boolean>(false);
  const [mobileHelperControlVisible,setMobileHelperControlVisible]=useState<boolean>(false);
  const [mobileHelperListVisible,setMobileHelperListVisible]=useState<boolean>(false);
  const [onTreeModal,setOnTreeModal]=useState<boolean>(false);


  return (
    <div className="w-full h-full grid grid-cols-10">
      <div className={`block grid-cols-8 ${helperVisible?`col-span-8`:`col-span-10`}`}>
        <TopMenu
          helperVisible={helperVisible} 
          setHelperVisibile={sethelperVisible}
          setMobileHelper={()=>{
              setMobileHelperControlVisible(false);
              setMobileHelperListVisible(true);
          }}
          />
        <main className={`w-full h-full grid `}>
          {commonState&&!commonState.onMobile&&(<TreeListComponent/>)}
            {commonState&&commonState.onMobile&&(
            <div className=" absolute left-4 bottom-4 z-10">
                <Button onClick={()=>{setOnTreeModal(!onTreeModal)}} shape={`circle`} icon={onTreeModal?<CloseOutlined/>:<SearchOutlined/> }/>
            </div>)}
            <div className={`w-full h-full border`} >
                <Suspense fallback={null}>
                    <CanvasComponent setLoadingComplete={setLoadingComplte} setLoadingPercent={setLoadingPercent}/>
                </Suspense>
            </div>
        </main>
        <CameraPosition/>
        <CustomLayout/>
      </div>
      {!loadingComplete&&(
        <LoadingComponent/>
      )}
      {commonState?.onMobile?
            (mobileHelperListVisible&&<MobileHelperList 
                onControl={()=>{
                    setMobileHelperControlVisible(true)
                    setMobileHelperListVisible(false)
                    sethelperVisible(false)
                }}/>):
            (<HelperListComponent visible={helperVisible}/>)}
            {commonState?.onMobile&&mobileHelperControlVisible&&<MobileHelperControl/>}
    </div>
  )
}

export default Home
