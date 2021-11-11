import { IsInt, IsString, Length } from 'class-validator';
import express from 'express';
export class CreateDemoDto {
  @IsString()
  title: string;
  name: string;
}

export class GenerateCreateDemoDto {
  static generate(req: express.Request) {
    const createDemoData = new CreateDemoDto();
    createDemoData.name = req.body.name;
    return createDemoData;
  }
}
