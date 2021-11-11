import { CreateSubTaskDto } from './dto/create.subtask.dto';
import poolServices from '../../common/services/pool.services';
import { PatchTitleSubTaskDto } from './dto/patchTitle.subtask.dto';
import express from 'express';
import { PatchStatusSubtaskDto } from './dto/patchStatus.subtask.dto';
import CustomErrorService from '../errors/CustomError.service';
import tasksService from '../tasks/tasks.service';

class SubtasksService {
  async getList() {
    const result = await poolServices.query('SELECT * FROM subtasks ORDER BY id');
    return result.rows;
  }
  async create(createSubtaskData: CreateSubTaskDto) {
    try {
      await poolServices.query(`BEGIN`);
      const result = await poolServices.query(`INSERT INTO subtasks (title,task_id) VALUES ($1,$2) RETURNING *`, [
        createSubtaskData.title,
        createSubtaskData.task_id,
      ]);
      await poolServices.query('UPDATE tasks set status=false WHERE id=$1',[createSubtaskData.task_id])
      await poolServices.query(`COMMIT`);
      return result.rows[0];
    } catch (error) {
      await poolServices.query(`ROLLBACK`);
      return Promise.reject(error);
    }
  }

  async patchTitle(patchTitleSubTaskData: PatchTitleSubTaskDto) {
    const result = await poolServices.query(`UPDATE subtasks SET title = $1 WHERE id =$2  RETURNING *`, [
      patchTitleSubTaskData.title,
      patchTitleSubTaskData.id,
    ]);

    if (result.rows.length < 1) {
      return Promise.reject(CustomErrorService.IdDoesNotExist(patchTitleSubTaskData.id, 'subtask', 'patch', 'subtask'));
    }

    return result.rows[0];
  }

  async _patchStatusCaseTrue(taskId: number) {
    const resultFindUnSuccess = await poolServices.query(
      'SELECT status FROM subtasks WHERE status=false AND task_id=$1 LIMIT 1;',
      [taskId]
    );

    if (resultFindUnSuccess.rows.length === 0) {
     
      await poolServices.query('UPDATE tasks set status=true WHERE id=$1',[taskId])
    }
  }

  async patchStatus(patchStatusSubtaskData: PatchStatusSubtaskDto) {
    try {
      await poolServices.query('BEGIN');
      const result = await poolServices.query(`UPDATE subtasks SET status = $1 WHERE id =$2  RETURNING *`, [
        patchStatusSubtaskData.status,
        patchStatusSubtaskData.id,
      ]);

      if (result.rows.length < 1) {
        await poolServices.query('ROLLBACK');
        return Promise.reject(
          CustomErrorService.IdDoesNotExist(patchStatusSubtaskData.id, 'subtask', 'patch', 'subtask')
        );
      }
      if (patchStatusSubtaskData.status === true) {
    
       await this._patchStatusCaseTrue(result.rows[0].task_id);
      }else{
         await  poolServices.query(`UPDATE tasks SET status=false WHERE id=$1;`,[result.rows[0].task_id])
      }



      await poolServices.query('COMMIT');
      return result.rows[0];
    } catch (error) {
      await poolServices.query('ROLLBACK');
      return Promise.reject(error);
    }
  }
}

export default new SubtasksService();
