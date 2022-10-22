import React from 'react';
import { Logo } from '../atoms/Logo';
import { ConnectWalletButton } from './ConnectWalletButton';
import { Navbar } from './Navbar';

export const Header = () => {
  return (
    <header className="py-8 flex justify-between items-center h-24 bg-white w-full">
      <Logo />
      <div className="flex items-center justify-around">
        <Navbar />
        <ConnectWalletButton />
      </div>
    </header>
  );
};
