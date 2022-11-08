import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { cleanEnv, str } from 'envalid';
import { default as dotenv } from 'dotenv';

dotenv.config();

const env = cleanEnv(process.env, {
  GOERLI_PRIVATE_KEY: str(),
  ALCHEMY_URL: str(),
});

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  networks: {
    goerli: {
      url: env.ALCHEMY_URL,
      accounts: [env.GOERLI_PRIVATE_KEY!],
    },
  },
};

export default config;
