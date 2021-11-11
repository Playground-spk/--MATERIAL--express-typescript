import { IsInt, IsString, Length } from 'class-validator';
import express from 'express';
export class PatchTitleSubTaskDto {
  @IsInt()
  id: number;
  @IsString()
  @Length(1, 80)
  title: string;
}

export class GeneratePatchTitleSubTaskDto {
  static generate(req: express.Request) {
    const patchTitleSubTaskData = new PatchTitleSubTaskDto();
    patchTitleSubTaskData.title = req.body.title;
    patchTitleSubTaskData.id = Number(req.params.id);
    return patchTitleSubTaskData;
  }
}
