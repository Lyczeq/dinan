import React from 'react';
import { Button } from 'components/atoms/Button';
import { useEthers } from '@usedapp/core';

export const ConnectWalletButton = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();

  const handleAccountConnection = () => {
    if (account) {
      deactivate();
    } else {
      activateBrowserWallet();
    }
  };

  return (
    <Button
      className="ml-6 px-4 bg-gradient-to-tr from-orange-400 to-yellow-400 font-bold 
      w-40 text-ellipsis overflow-hidden"
      onClick={handleAccountConnection}
    >
      {account ? account : 'Connect Wallet'}
    </Button>
  );
};
