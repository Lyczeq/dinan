import type { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { Header } from '../components/organisms/Header';

import '../styles/globals.css';

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
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
}

export default MyApp;
