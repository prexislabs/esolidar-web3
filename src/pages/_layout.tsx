import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Viewport from '@esolidar/toolkit/build/components/viewport';
import Header from '../components/Header';
import Footer from '../components/Footer';

/* eslint-disable no-undef */
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const [isHeaderTransparent, setIsHeaderTransparent] = useState<boolean>(router.pathname === '/');

  useEffect(() => {
    document.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (scroll > 700) setIsHeaderTransparent(false);
      else setIsHeaderTransparent(true);
    });
    return () => {
      document.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>eSolidar Web3</title>

        <link rel="stylesheet" href="https://use.typekit.net/xse0hrt.css" />
        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <Header isHomepage={router.pathname === '/' && isHeaderTransparent} />
      {router.pathname === '/' ? (
        <div>{children}</div>
      ) : (
        <div className="app">
          <Viewport centred size="xl">
            <div className="container">{children}</div>
          </Viewport>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Layout;
