import { IsInt, IsString, Length } from 'class-validator';
import express from 'express'
export class CreateSubTaskDto {
  @IsString()
  @Length(1,80)
  title: string ;

  @IsInt()
  task_id:number;

 
}


 export class GenerateCreateSubTaskDto {

 static generate(req: express.Request){
    const createSubTaskData = new CreateSubTaskDto()
    createSubTaskData.title = req.body.title
    createSubTaskData.task_id =  Number(req.body.task_id)
  return createSubTaskData
 }
}


