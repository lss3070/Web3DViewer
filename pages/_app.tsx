import '../styles/globals.css'
import 'antd/dist/antd.less'
import '@fortawesome/fontawesome-svg-core/styles.css'

import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import SEO from '../seo.config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/gtag'
import { ThemeProvider } from 'next-themes'


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <DefaultSeo {...SEO}/>
      <ThemeProvider attribute='class'>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
