import '../styles/globals.css'
import 'antd/dist/antd.less'
import '@fortawesome/fontawesome-svg-core/styles.css'

import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'


function MyApp({ Component, pageProps }: AppProps) {
  const DEFAULT_SEO={
    title:"Web 3D Viewer | Free Online Viewer",
    description: "Web 3D Viewer is a browser-based web solution for reading 3d file formats.",
    canonical: "https://www.web3dviewer.net/",
    openGraph:{
      type:'website',
      url:'https://www.web3dviewer.net/',
      title:'Web 3D Viewer',
      description:"Web 3D Viewer is a browser-based web solution for reading 3d file formats.",
      site_name:'Web 3D Viewer',
      images:[
        {
          url: "/preview.png",
          width: 800,
          height: 420,
          alt: "Web 3D Viewer",
        }
      ]
    },
    twitter:{
      handle: '@handle',
      site: '@site',
      cardType: 'summary_large_image',
    }
  }
  return (
    <>
      <DefaultSeo {...DEFAULT_SEO}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
