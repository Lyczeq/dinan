import { cleanEnv, port, str } from 'envalid';
import { default as dotenv } from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port(),
  DATABASE_URL: str(),
  ALCHEMY_WEBSOCKET_LINK: str(),
  PRIVATE_KEY: str(),
  ALCHEMY_API_KEY: str(),
});
