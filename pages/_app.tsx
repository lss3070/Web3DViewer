import '../styles/globals.css'
import 'antd/dist/antd.min.css'
import type { AppProps } from 'next/app'
import '@fortawesome/fontawesome-svg-core/styles.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
