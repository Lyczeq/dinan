import { HardhatUserConfig } from 'hardhat/config';
import { cleanEnv, str } from 'envalid';
import { default as dotenv } from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';

dotenv.config();

const env = cleanEnv(process.env, {
  PRIVATE_KEY: str(),
  ALCHEMY_URL: str(),
});

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    hardhat: {},
    matic: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [env.PRIVATE_KEY],
    },
  },
};

export default config;
