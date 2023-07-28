import express from 'express'
import * as http from 'http'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import cors from 'cors'
import debug from 'debug'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import responseTime from 'response-time'

import { type CommonRoutesConfig } from './common/common.routes.config.js'
import { UsersRoutes } from './users/users.routes.config.js'

import config from './config/index.js'

const app: express.Application = express()

app
  .use(express.json())
  .use(cors())
  .use(helmet())
  .use(compression())
  .use(rateLimit({
    windowMs: 15 * 60 * 1500,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false
  }))
  .use(responseTime())

const server: http.Server = http.createServer(app)

const { HOST, PORT } = config.server

const routes: CommonRoutesConfig[] = []

routes.push(new UsersRoutes(app))

const debugLog: debug.IDebugger = debug('app')

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({
      all: true
    })
  )
}

// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
if (!process.env.DEBUG) {
  loggerOptions.meta = false
}

app.use(expressWinston.logger(loggerOptions))

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const message: string = `The application is up and running on http://${HOST}:${PORT}`

app.get('/health-check', (req: express.Request, res: express.Response) => {
  res.status(200).send({
    success: true,
    status: 200,
    statusMessages: [message]
  })
})

const startServer = (): void => {
  server.listen(PORT, HOST, () => {
    routes.forEach((route: CommonRoutesConfig) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      debugLog(`Routes configured for ${route.getName()}`)
    })
    console.info(message)
  })
}

startServer()
