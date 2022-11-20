import React from 'react';
import { Button } from 'components/atoms/Button';
import { useEthers } from '@usedapp/core';

export const ConnectWalletButton = () => {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <Button
      className="ml-6 px-4 bg-gradient-to-tr from-orange-400 to-yellow-400 font-bold 
      w-40 text-ellipsis overflow-hidden"
      onClick={activateBrowserWallet}
    >
      {account ? account : 'Connect Wallet'}
    </Button>
  );
};
