import { validateOrReject } from 'class-validator';
import debug from 'debug';
import express from 'express';
import { CreateSubTaskDto, GenerateCreateSubTaskDto } from './dto/create.subtask.dto';
import subtasksService from './subtasks.service';
import { CommonSuccessResJson } from './../../common/interfaces/commonSuccessResJson.interface';
import { GeneratePatchTitleSubTaskDto, PatchTitleSubTaskDto } from './dto/patchTitle.subtask.dto';
import { GeneratePatchStatusSubtaskDto, PatchStatusSubtaskDto } from './dto/patchStatus.subtask.dto';

const log: debug.IDebugger = debug('app:subtasks-controller');


class SubTasksController {


    async create(req: express.Request, res: express.Response,next: express.NextFunction) {
        const createSubtaskData:CreateSubTaskDto = GenerateCreateSubTaskDto.generate(req)
        try {
          await  validateOrReject(createSubtaskData)
            const subtask = await subtasksService.create(createSubtaskData)
            const resData : CommonSuccessResJson = {
                statusCode:201,
                message:'create subtask sucessfully',
                data:subtask
            }
            res.status(201).send(resData); 
        } catch (error: any) {
            log(error)
            next(error)
        }
        
    }

    async patchTitle(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req?.query?.field !== 'title') return next();
        const patchTitleSubTaskData: PatchTitleSubTaskDto = GeneratePatchTitleSubTaskDto.generate(req);
        try {
          await validateOrReject(patchTitleSubTaskData);
          const result = await subtasksService.patchTitle(patchTitleSubTaskData);
          const resData: CommonSuccessResJson = {
            statusCode: 200,
            message: 'patch title task successfully',
            data: result,
          };
          res.status(200).json(resData)
        } catch (error) {
        
          log(error);
          next(error);
        }
      }

      async patchStatus(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req?.query?.field !== 'status') return next();

        const patchStatusSubtaskData: PatchStatusSubtaskDto = GeneratePatchStatusSubtaskDto.generate(req);
        try {
          await validateOrReject(patchStatusSubtaskData);
          const result = await subtasksService.patchStatus(patchStatusSubtaskData);
          const resData: CommonSuccessResJson = {
            statusCode: 200,
            message: 'patch status task successfully',
            data: result,
          };
          res.status(200).json(resData)
        } catch (error) {
          log(error);
          next(error);
        }
      }

      async patch(req: express.Request, res: express.Response, next: express.NextFunction) {
       
           res.status(404).send('page not found')
        
        try {
       
        } catch (error) {
        
          log('patchTitle')
          log(error);
          next(error);
        }
      }


}


export default new SubTasksController()