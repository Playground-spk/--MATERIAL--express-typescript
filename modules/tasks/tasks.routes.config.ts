import { CommonRoutesConfig } from '../../common/common.routes.config';
import express from 'express';
import tasksController from './tasks.controller';
export class TasksRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'tasksRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route(`/tasks`).get(tasksController.listTasks).post(tasksController.create);

    this.app.route('/tasks/:id').patch(tasksController.patchTitle, tasksController.patchStatus, tasksController.patch);
    return this.app;
  }
}
