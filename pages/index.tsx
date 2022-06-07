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


const Home: NextPage = () => {

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
        <main className={`w-full h-full grid grid-cols-7`}>
          {commonState&&!commonState.onMobile&&(<TreeListComponent/>)}
            {commonState&&commonState.onMobile&&(
            <div className=" absolute left-4 bottom-4 z-10">
                <Button onClick={()=>{setOnTreeModal(!onTreeModal)}} shape={`circle`} icon={onTreeModal?<CloseOutlined/>:<SearchOutlined/> }/>
            </div>)}
            <div className={`w-full h-full border ${commonState?.onMobile?`col-span-7`:`col-span-6`}`} >
                <Suspense fallback={null}>
                    <CanvasComponent setLoadingComplete={setLoadingComplte} setLoadingPercent={setLoadingPercent}/>
                </Suspense>
            </div>
        </main>
        <CustomLayout/>
      </div>
      {commonState?.onMobile?
            (mobileHelperListVisible&&<MobileHelperList 
                onControl={()=>{
                    setMobileHelperControlVisible(true)
                    setMobileHelperListVisible(false)
                    sethelperVisible(false)
                }}/>):
            (<HelperListComponent visible={helperVisible}/>)}
            {commonState?.onMobile&&mobileHelperControlVisible&&<MobileHelperControl/>}

      {/* <footer >
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home
