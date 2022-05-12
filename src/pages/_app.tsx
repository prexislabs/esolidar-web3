import { useState } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { IntlProvider } from 'react-intl';
import {
  ContractKitProvider,
  SupportedProviders,
  Alfajores,
  Mainnet,
} from '@celo-tools/use-contractkit';
import '../assets/styles/_index.scss';
import '@celo-tools/use-contractkit/lib/styles.css';

// const defaultRichTextElements = {
//   br: <br />,
//   b: (chunks: any) => <b>{chunks}</b>,
//   p: (chunks: any) => <p>{chunks}</p>,
//   i: (chunks: any) => <i>{chunks}</i>,
//   strong: (chunks: any) => <strong>{chunks}</strong>,
// };

const messages = {
  br: { 'home-page': 'Página inicial' },
  en: { 'home-page': 'Home page' },
  pt: { 'home-page': 'Página inicial' },
};

const MyApp = ({ Component, pageProps, initialProps }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const { locale } = initialProps;

  const contractkitNetwork = process.env.NEXT_PUBLIC_ENV === 'production' ? Mainnet : Alfajores;

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
        <title>Next.js PWA Example</title>

        <link rel="manifest" href="/manifest.json" />
        <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <ContractKitProvider
        dapp={{
          name: 'use-contractkit demo',
          description: 'A demo DApp to showcase functionality',
          url: 'https://use-contractkit.vercel.app',
          icon: 'https://use-contractkit.vercel.app/favicon.ico',
        }}
        connectModal={{
          providersOptions: {
            hideFromDefaults: [
              SupportedProviders.CeloDance,
              SupportedProviders.CeloExtensionWallet,
              SupportedProviders.CeloTerminal,
              SupportedProviders.CeloWallet,
              SupportedProviders.Injected,
              SupportedProviders.Ledger,
              SupportedProviders.PrivateKey,
            ],
          },
        }}
        network={contractkitNetwork}
      >
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <IntlProvider
              locale="pt"
              messages={messages[locale] || messages.en}
              // defaultRichTextElements={defaultRichTextElements}
            >
              <Component {...pageProps} />
              {process.env.NEXT_PUBLIC_ENV === 'development' && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </IntlProvider>
          </Hydrate>
        </QueryClientProvider>
      </ContractKitProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: any) => {
  const { locale } = appContext.ctx;

  return {
    initialProps: {
      locale,
    },
  };
};

export default MyApp;