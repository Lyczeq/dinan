import { cleanEnv, str } from 'envalid';
import { default as dotenv } from 'dotenv';

dotenv.config();

export const env = cleanEnv(process.env, {
  ALCHEMY_WEBSOCKET_LINK: str(),
});
