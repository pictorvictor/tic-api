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
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_DATABASE_URL,
} = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  API_URL: str(),
  FRONTEND_URL: str(),
  LOG_FORMAT: str(),
  LOG_DIR: str(),
  JWT_ACCESS_SECRET: str(),
  FIREBASE_PROJECT_ID: str(),
  FIREBASE_CLIENT_EMAIL: str(),
  FIREBASE_PRIVATE_KEY: str(),
  FIREBASE_DATABASE_URL: str(),
});
