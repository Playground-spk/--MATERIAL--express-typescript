import poolServices from "../../common/services/pool.services";
import { CreateDemoDto } from './dto/create-demo.dto';



class DemoService {
    async create(createDemoData: CreateDemoDto) {
        try {
        
          const result = await poolServices.query(`INSERT INTO demo (name) VALUES ($1) RETURNING *`, );
     
          return result.rows[0];
        } catch (error) {
   
          return Promise.reject(error);
        }
      }
}

export default new DemoService();
