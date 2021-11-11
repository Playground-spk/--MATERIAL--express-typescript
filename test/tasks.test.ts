import poolServices from '../common/services/pool.services';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';


beforeAll(async () => {
  const dotenvResult = dotenv.config();
  if (dotenvResult.error) {
    throw dotenvResult.error;
  }
  console.log('before all');

  await poolServices.connect({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_TEST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  const directoryPath = path.join(__dirname, '../sql/migrate/up');
  const filesName = fs.readdirSync(directoryPath);
  const arr = [];

  filesName.forEach(function (file) {
    const result = fs.readFileSync(directoryPath + '/' + file, 'utf-8');
    arr.push(result);
  });
  try {
    arr.forEach(async (sql) => {
      await poolServices.query(sql);
    });
  } catch (error) {
    console.log(error);
  }
});




afterAll(async () => {
  console.log('after all');
  const directoryPath = path.join(__dirname, '../sql/migrate/down');
  const filesName = fs.readdirSync(directoryPath);
  const arr = [];

  filesName.forEach(function (file) {
    const result = fs.readFileSync(directoryPath + '/' + file, 'utf-8');
    arr.push(result);
  });
  try {
    while (arr.length > 0) {
      const sql = arr.pop();
      await poolServices.query(sql);
    }
    return poolServices.close();
  } catch (error) {
    console.log(error);
  }
});
