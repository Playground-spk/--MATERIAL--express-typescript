import { IsBoolean, IsInt, IsString, Length } from 'class-validator';
import express from 'express';
export class PatchStatusTaskDto {
  @IsInt()
  id: number;
  @IsBoolean()
  status: boolean;
}

export class GeneratePatchStatusTaskDto {
  static generate(req: express.Request) {
    const patchStatusTaskData = new PatchStatusTaskDto();
    patchStatusTaskData.status = req.body.title;
    patchStatusTaskData.id = Number(req.params.id);
    return patchStatusTaskData;
  }
}
