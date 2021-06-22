interface ServerConfig {
  HOST: string;
  PORT: number;
}
interface DBConfig {
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
}
interface JWTConfig {
  JWT_SECRET: string;
  JWT_ISSUER: string;
  ACCESS_TOKEN_EXPIRY: string;
  REFRESH_TOKEN_EXPIRY: string;
}
export interface Config {
  env: string;
  server: ServerConfig;
  db: DBConfig;
  jwt: JWTConfig;
}
