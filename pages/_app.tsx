import '../styles/globals.css'
import 'antd/dist/antd.less'
import '@fortawesome/fontawesome-svg-core/styles.css'

import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import SEO from '../seo.config'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <DefaultSeo {...SEO}/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
