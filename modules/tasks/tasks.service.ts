import poolServices from '../../common/services/pool.services';
import { CreateTaskDto } from './dto/create.task.dto';
import { PatchTitleTaskDto } from './dto/patchTitle.task.dto';
import express from 'express';
import CustomErrorService from '../errors/CustomError.service';
import subtasksService from '../subtasks/subtasks.service';
import { PatchStatusTaskDto } from './dto/patchstatus.task.dto';
import { debug } from 'debug';
const log: debug.IDebugger = debug('app:tasks-service');
class TasksService {
  async getList(): Promise<any> {
    const subtaskList: Array<any> = await subtasksService.getList();
    const hashMapGroupSubTaskByTaskId = {};
    for (let subtask of subtaskList) {
      if (!hashMapGroupSubTaskByTaskId?.[subtask.task_id]) {
        hashMapGroupSubTaskByTaskId[subtask.task_id] = [];
      }
      hashMapGroupSubTaskByTaskId[subtask.task_id].push(subtask);
    }
    const rawDataTasks = await poolServices.query(`SELECT * FROM tasks ORDER BY id`);
    const taskListIncludeSubtasks = rawDataTasks.rows.map((task) => {
      task['subtasks'] = hashMapGroupSubTaskByTaskId[task.id];
      return task;
    });
    return taskListIncludeSubtasks;
  }

  async create(createTaskData: CreateTaskDto) {
    const result = await poolServices.query(`INSERT INTO tasks (title) VALUES ($1) RETURNING *`, [
      createTaskData.title,
    ]);
    return result.rows[0];
  }
  async patchTitle(patchTitleTaskData: PatchTitleTaskDto) {
    const result = await poolServices.query(`UPDATE tasks SET title = $1 WHERE id =$2  RETURNING *`, [
      patchTitleTaskData.title,
      patchTitleTaskData.id,
    ]);

    if (result.rows.length < 1)
      return Promise.reject(CustomErrorService.IdDoesNotExist(patchTitleTaskData.id, 'task', 'patch', 'task'));

    return result.rows[0];
  }
  async patchStatus(patchStatusTaskData: PatchStatusTaskDto) {
    log('patch status')
    try {
      await poolServices.query('BEGIN');
      await poolServices.query('UPDATE tasks set status = $1 WHERE ID=$2', [
        patchStatusTaskData.status,
        patchStatusTaskData.id,
      ]);
        
      await poolServices.query('UPDATE subtasks set status = $1 WHERE task_id=$2', [
        patchStatusTaskData.status,
        patchStatusTaskData.id,
      ]);
      await poolServices.query('COMMIT');
    } catch (error) {
      await poolServices.query(`ROLLBACK`);
      return Promise.reject(error);
    }
  }
}

export default new TasksService();
