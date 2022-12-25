import { cleanEnv, port, str } from 'envalid';
import { default as dotenv } from 'dotenv';

//env file from the root folder
dotenv.config({
  path: '../../.env',
});

export const env = cleanEnv(process.env, {
  DATABASE_URL: str(),
  API_PORT: port(),
  PRIVATE_KEY: str(),
  ALCHEMY_HTTPS_LINK: str(),
  ALCHEMY_API_KEY: str(),
});
