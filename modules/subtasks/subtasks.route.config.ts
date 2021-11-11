import { CommonRoutesConfig } from '../../common/common.routes.config';
import express from 'express';
import subtasksController from './subtasks.controller';
export class SubTasksRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'tasksRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/subtasks`).post(subtasksController.create);

    this.app
      .route('/subtasks/:id')
      .patch(subtasksController.patchTitle, subtasksController.patchStatus, subtasksController.patch);
    return this.app;
  }
}
