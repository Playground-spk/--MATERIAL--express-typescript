import { CommonRoutesConfig } from '../../common/common.routes.config';
import express from 'express';
import demoController from './demo.controller';
export class DemoRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'demoRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/demo`).post(demoController.create);


    return this.app;
  }
}
