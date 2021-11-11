import { validateOrReject } from 'class-validator';
import debug from 'debug';
import express from 'express';
import { CreateDemoDto, GenerateCreateDemoDto } from './dto/create-demo.dto';
import demoService from './demo.service';
import { CommonSuccessResJson } from '../../common/interfaces/commonSuccessResJson.interface';


const log: debug.IDebugger = debug('app:demo-controller');


class DemoController {


    async create(req: express.Request, res: express.Response,next: express.NextFunction) {
      log('create demo ')
        const createDemoData:CreateDemoDto = GenerateCreateDemoDto.generate(req)
        try {
          await  validateOrReject(createDemoData)
            const result = await demoService.create(createDemoData)
            const resData: CommonSuccessResJson = {
              statusCode:201,
              message:'create demo sucessfully',
              data:result
            }
        } catch (error: any) {
            log(error)
            next(error)
        }
        
    }


}


export default new DemoController()