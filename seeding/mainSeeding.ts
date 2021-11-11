import poolServices from '../common/services/pool.services';
import * as dotenv from 'dotenv';
import * as faker from 'faker';
import * as format from 'pg-format';
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

poolServices
  .connect({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  })
  .then(async () => {
    const arrTitle: Array<Array<string>> = [];

    while (arrTitle.length < 10) {
      const title: string = faker.name.title();
      arrTitle.push([title]);
    }

    const result = await poolServices.query(format('INSERT INTO tasks(title) VALUES %L RETURNING id', arrTitle));
    const arrTitleSubTask: Array<any> = [];
    console.log(result.rows)
    while (arrTitleSubTask.length < 40) {
      const title: string = faker.name.title();
      const taskId: number = result.rows[Math.floor(Math.random() * (result.rows.length - 1))].id;
      arrTitleSubTask.push([taskId, title]);
    }
   await poolServices.query(format('INSERT INTO subtasks(task_id,title) VALUES %L', arrTitleSubTask));
  });
