import dotenv from 'dotenv';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import debug from 'debug';
import helmet from 'helmet';
import poolServices from './common/services/pool.services';
import { TasksRoutes } from './modules/tasks/tasks.routes.config';
import ErrorGlobalHandler from './modules/errors/error.globalHandler';
import { SubTasksRoutes } from './modules/subtasks/subtasks.route.config';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 8000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');
const logDbConnection: debug.IDebugger = debug('app:db');

app.use(express.json());
// app.use(helmet());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

routes.push(new TasksRoutes(app));
routes.push(new SubTasksRoutes(app));

app.use(expressWinston.logger(loggerOptions));
app.use(ErrorGlobalHandler.globalErrorHandlerConfig());
poolServices
  .connect({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })
  .then(() => {
    logDbConnection('database connect successfully');
    server.listen(port, () => {
      routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
      });
    });
  })
  .catch((error) => {
    logDbConnection('Error !! cannot connect to database');
    console.error(error);
  });
