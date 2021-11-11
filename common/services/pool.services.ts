import { Pool, PoolConfig, QueryResult } from 'pg';

class PoolService {
  _pool: Pool;


  connect(options: PoolConfig) {
    if(process.env.NODE_ENV ==='development') console.log('PoolConfig =>',options)
    this._pool = new Pool(options);
    return this._pool.query('SELECT 1 + 1;');
  }

  close() {
    return this._pool.end();
  }

  query(sql: any, params?: any): Promise<QueryResult<any>> {
    return this._pool.query(sql, params);
  }
}

export default new PoolService();
