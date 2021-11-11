import { validateOrReject } from 'class-validator';
import debug from 'debug';
import express from 'express';
import { CreateTaskDto, GenerateCreateTaskDto } from './dto/create.task.dto';
import { GeneratePatchTitleTaskDto, PatchTitleTaskDto } from './dto/patchTitle.task.dto';
import tasksService from './tasks.service';
import { CommonSuccessResJson } from './../../common/interfaces/commonSuccessResJson.interface';
import { PatchStatusTaskDto } from './dto/patchstatus.task.dto';
import { GeneratePatchStatusSubtaskDto } from '../subtasks/dto/patchStatus.subtask.dto';
const log: debug.IDebugger = debug('app:tasks-controller');

class TasksController {
  async listTasks(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const listTasks = await tasksService.getList();
      const resData: CommonSuccessResJson = {
        statusCode: 200,
        message: 'get list of task sucessfully',
        data: listTasks,
      };
      res.status(200).json(resData);
    } catch (error: any) {
      log(error);
      next(error);
    }
  }

  async create(req: express.Request, res: express.Response, next: express.NextFunction) {
    const createTaskData: CreateTaskDto = GenerateCreateTaskDto.generate(req);
    try {
      await validateOrReject(createTaskData);
      const tasks = await tasksService.create(createTaskData);
      const resData: CommonSuccessResJson = {
        statusCode: 201,
        message: 'create task successfully',
        data: tasks,
      };
      res.status(201).json(resData);
    } catch (error: any) {
      log(error);
      next(error);
    }
  }

  async patchTitle(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req?.query?.field !== 'title') return next();

    const patchTitleTaskData: PatchTitleTaskDto = GeneratePatchTitleTaskDto.generate(req);
    try {
      await validateOrReject(patchTitleTaskData);
      const result = await tasksService.patchTitle(patchTitleTaskData);
      const resData: CommonSuccessResJson = {
        statusCode: 200,
        message: 'patch title task successfully',
        data: result,
      };
      res.status(200).json(resData);
    } catch (error) {
      log('patchTitle');
      log(error);
      next(error);
    }
  }

  async patchStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req?.query?.field !== 'status') return next();

    const patchStatusTaskData = GeneratePatchStatusSubtaskDto.generate(req);
    try {
      await validateOrReject(patchStatusTaskData);
      const result = await tasksService.patchStatus(patchStatusTaskData);
      const resData: CommonSuccessResJson = {
        statusCode: 200,
        message: 'patch title task successfully',
        data: result,
      };
      res.status(200).json(resData);
    } catch (error) {
      log('patchTitle');
      log(error);
      next(error);
    }
  } 

  async patch(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      res.status(404).send('Page Not Found');
    } catch (error) {}
  }
}

export default new TasksController();
