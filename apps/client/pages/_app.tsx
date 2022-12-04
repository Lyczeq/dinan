import { Config, DAppProvider, Mumbai } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Header } from 'components/molecules/Header';
import { Footer } from 'components/atoms/Footer';
import { Roboto } from '@next/font/google';

import '../styles/globals.css';

const robotoFont = Roboto({
  subsets: ['latin-ext'],
  weight: ['400', '700'],
});

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
  <div
    className={`max-w-screen-2xl mx-auto bg-white flex flex-col items-center ${robotoFont.className}`}
  >
    <Header />
    <div className="min-h-[calc(3/4*100vh)] w-full mb-20">{children}</div>
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
