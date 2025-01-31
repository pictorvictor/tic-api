import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';
config();

export const {
  NODE_ENV,
  PORT,
  API_URL,
  FRONTEND_URL,
  LOG_FORMAT,
  LOG_DIR,
  JWT_ACCESS_SECRET,
} = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  API_URL: str(),
  FRONTEND_URL: str(),
  LOG_FORMAT: str(),
  LOG_DIR: str(),
  JWT_ACCESS_SECRET: str(),
});
