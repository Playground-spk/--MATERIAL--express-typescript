import { IsBoolean, IsInt } from 'class-validator';
import express from 'express';
export class PatchStatusSubtaskDto {
  @IsInt()
  id: number;
 @IsBoolean()
  status: boolean;
}

export class GeneratePatchStatusSubtaskDto {
  static generate(req: express.Request) {
    const patchStatusSubtaskData = new PatchStatusSubtaskDto();
    patchStatusSubtaskData.status = req.body.status;
    patchStatusSubtaskData.id = Number(req.params.id);
    return patchStatusSubtaskData;
  }
}
