import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import {useRouter} from "next/router";
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import dynamic from 'next/dynamic';

// provider
import { ThemeProvider } from '@material-ui/core/styles';
import "../styles/toast.css";
import "../styles/globals.css";
const DrawerDynamic = dynamic(() => import('../components/layout/Drawer'), {
  ssr: true,
})

export default function MyApp(props) {
  const router = useRouter();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  const { Component, pageProps } = props;
  return (
    <React.Fragment>
      <Head>
        <title>B-Dev-G | By dev for dev</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico"/>
      </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <DrawerDynamic path={router.pathname} spaceQuery={router.query.space}>
            <Component {...pageProps} />
          </DrawerDynamic>
        </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};