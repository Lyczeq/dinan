import type { AppProps } from 'next/app';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen max-w-screen-2xl m-auto bg-white">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
