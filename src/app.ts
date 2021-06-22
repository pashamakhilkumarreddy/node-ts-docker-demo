import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import debug from 'debug';
import helmet from 'helmet';
import compression from 'compression';

import { CommonRoutesConfig } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';

import config from './config';

const app: express.Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

const server: http.Server = http.createServer(app);

const { HOST, PORT } = config.server;

const routes: Array<CommonRoutesConfig> = [];

routes.push(new UsersRoutes(app));

routes.forEach((route: CommonRoutesConfig) => {
  console.log(route)
});

const debugLog: debug.IDebugger = debug('app');

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({
      all: true,
    }),
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

const message: string = `The application is up and running on http://${HOST}:${PORT}`;

app.get('/health-check', (req: express.Request, res: express.Response) => {
  res.status(200).send({
    success: true,
    status: 200,
    statusMessages: [message],
  });
});

const startServer = (): void => {
  server.listen(PORT, () => {
    routes.forEach((route: CommonRoutesConfig) => {
      console.info(`Routes configured for ${route.getName()}`);
      debugLog(`Routes configured for ${route.getName()}`);
    });
    console.info(message);
  });
};

startServer();
