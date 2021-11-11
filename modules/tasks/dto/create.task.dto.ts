import { IsString, Length } from 'class-validator';
import express from 'express'
export class CreateTaskDto {
  @IsString()
  @Length(1,80)
  title: string ;

 
}


 export class GenerateCreateTaskDto {

 static generate(req: express.Request){
    const createTaskData = new CreateTaskDto()
    createTaskData.title = req.body.title
  return createTaskData
 }
}


