import '../styles/globals.css'
import 'antd/dist/antd.less'
import '@fortawesome/fontawesome-svg-core/styles.css'

import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import SEO from '../seo.config'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <>
      <meta name="naver-site-verification" content="06e7a97929fd9b608409463f8548427d62f8bdc3" />
    </>
      <DefaultSeo {...SEO}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
