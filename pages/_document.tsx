
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";
import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {

   static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <>
          
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ]
      };
    } finally {
      sheet.seal();
    }
  }

    render():ReactElement {
      return (
        <Html>
          <Head>
            <meta name="naver-site-verification" content="06e7a97929fd9b608409463f8548427d62f8bdc3" />
            <script async src={`https://www.googletagmanager.com/gtag/js?id= ${GA_TRACKING_ID}`}></script>
            <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          </Head>
          <body>
            <Main />
            <div id="portal" />
            <NextScript/>
          </body>
        </Html>
      );
    }
  }