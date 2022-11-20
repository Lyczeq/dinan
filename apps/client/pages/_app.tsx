import { Config, DAppProvider, Mumbai } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

import { Header } from 'components/molecules/Header';

import '../styles/globals.css';

const config: Config = {
  readOnlyUrls: {
    [Mumbai.chainId]: getDefaultProvider('https://rpc-mumbai.maticvigil.com'),
  },
};

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => (
  <div className="h-screen max-w-screen-2xl m-auto px-4 bg-white flex flex-col items-center">
    <Header />
    {children}
  </div>
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </QueryClientProvider>
    </DAppProvider>
  );
}

export default MyApp;
