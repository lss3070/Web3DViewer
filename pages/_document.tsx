
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import { ReactElement } from "react";
import { ServerStyleSheet } from "styled-components";

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
          <Head/>
          <body>
            <Main />
            <div id="portal" />
            <NextScript/>
          </body>
        </Html>
      );
    }
  }