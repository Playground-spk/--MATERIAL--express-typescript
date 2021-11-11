import { IsInt, IsString, Length } from 'class-validator';
import express from 'express';
export class PatchTitleTaskDto {
  @IsInt()
  id: number;
  @IsString()
  @Length(1, 80)
  title: string;
}

export class GeneratePatchTitleTaskDto {
  static generate(req: express.Request) {
    const patchTitleTaskData = new PatchTitleTaskDto();
    patchTitleTaskData.title = req.body.title;
    patchTitleTaskData.id = Number(req.params.id);
    return patchTitleTaskData;
  }
}
