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

const Footer = () => {
  return (
    <footer className="w-[calc(100vw-1rem)] overflow-x-hidden bg-primary h-36">
      hello
    </footer>
  );
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
