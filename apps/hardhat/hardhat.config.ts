import { HardhatUserConfig } from 'hardhat/config';
import { cleanEnv, str } from 'envalid';
import { default as dotenv } from 'dotenv';
import 'solidity-docgen';
import '@nomicfoundation/hardhat-toolbox';

//env file from the root folder
dotenv.config({
  path: '../../.env',
});

const env = cleanEnv(process.env, {
  PRIVATE_KEY: str(),
});

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  docgen: {},
  networks: {
    hardhat: {},
    matic: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [env.PRIVATE_KEY],
    },
  },
};

export default config;
