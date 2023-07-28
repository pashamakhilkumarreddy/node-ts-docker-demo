/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Config } from '../types/interfaces/index.js'

const _ENV_ = process.env

export const ENV = _ENV_.NODE_ENV ?? 'development'

const config: Config = {
  env: ENV,
  server: {
    HOST: _ENV_.HOST ?? '127.0.0.1',
    PORT: parseInt(_ENV_.PORT ?? '5000', 10)
  },
  db: {
    DB_HOST: _ENV_.DB_HOST ?? '',
    DB_PORT: _ENV_.DB_PORT ?? '',
    DB_USER: _ENV_.DB_USER ?? '',
    DB_PASS: _ENV_.DB_PASS ?? '',
    DB_NAME: _ENV_.DB_NAME ?? ''
  },
  jwt: {
    JWT_SECRET:
      _ENV_.JWT_SECRET ?? 'gSOiKeYJSESauMSmEAOfW7Xb6Grgl4P7EtG+aH0mV4w=',
    JWT_ISSUER: _ENV_.JWT_ISSUER ?? 'johndoe',
    ACCESS_TOKEN_EXPIRY: _ENV_.ACCESS_TOKEN_EXPIRY ?? '',
    REFRESH_TOKEN_EXPIRY: _ENV_.REFRESH_TOKEN_EXPIRY ?? ''
  }
}

export default config
