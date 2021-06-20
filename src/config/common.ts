import { Config } from '../types/interfaces';

export const ENV = process.env.NODE_ENV || 'development';

const config: Config = {
  env: ENV,
  server: {
    HOST: process.env.HOST || '127.0.0.1',
    PORT: parseInt(process.env.PORT || '5000', 10),
  },
  db: {
    DB_HOST: process.env.DB_HOST || '',
    DB_PORT: process.env.DB_PORT || '',
    DB_USER: process.env.DB_USER || '',
    DB_PASS: process.env.DB_PASS || '',
    DB_NAME: process.env.DB_NAME || '',
  },
  jwt: {
    JWT_SECRET:
      process.env.JWT_SECRET || 'gSOiKeYJSESauMSmEAOfW7Xb6Grgl4P7EtG+aH0mV4w=',
    JWT_ISSUER: process.env.JWT_ISSUER || 'johndoe',
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '',
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '',
  },
};

export default config;
