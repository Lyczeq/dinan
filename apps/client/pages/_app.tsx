import { Config, DAppProvider, Mumbai } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from 'components/molecules/Header';
import { Footer } from 'components/atoms/Footer';

import '../styles/globals.css';

const queryClient = new QueryClient();

const config: Config = {
  readOnlyUrls: {
    [Mumbai.chainId]: getDefaultProvider('https://rpc-mumbai.maticvigil.com'),
  },
};

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => (
  <div className="max-w-screen-2xl mx-auto bg-white flex flex-col items-center">
    <Header />
    <div className="min-h-screen w-full mb-20">{children}</div>
    <Footer />
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
