import { cleanEnv, port, str } from 'envalid';
import { default as dotenv } from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port(),
  DATABASE_URL: str(),
  PRIVATE_KEY: str(),
  ALCHEMY_HTTPS_LINK: str(),
  ALCHEMY_API_KEY: str(),
});
