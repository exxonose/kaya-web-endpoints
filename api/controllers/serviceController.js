import dotenv from 'dotenv';
import pool from '../middlewares/config';
import response from '../middlewares/response';
dotenv.config();

class serviceController {

  static createService(req, res){
    const {icon, heading, description} = req.body;
    const id = Number(req.params.id);
    try {
      const query = 'SELECT * FROM tbl_api_service WHERE id = $1'; 
      pool.query(query, [id], (err, data) => {
        if(err) return err;
        if(data.rowCount > 0){
          return response.errorResponse(
              res, 409, `${title} already exists`
          );
        }
      })
    }

    catch(err) {
      return response.errorResponse(
          res, 500, 'Internal Server Error.'
 
      ) }

      finally {

        const insertQuery = 'INSERT INTO tbl_api_service (icon, heading, description) VALUES ($1, $2, $3) RETURNING id';
        pool.query(insertQuery, [icon, heading, description], (err, data) => {
          if(err) return err;
          const { id } = data.rows[0];
          return response.successResponse(
            res, 201, `${heading} successfully added to service`, 
            { id, icon,heading, description}
          )   
        }) 
     }
  }
  

  static getService(req, res){
    pool.query('SELECT * FROM tbl_api_service ORDER BY id ASC', (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 201, 'All service contents', data.rows,
      )   
    })
  }

  static getServiceById(req, res){
    const id = Number(req.params.id)
      pool.query('SELECT * FROM tbl_api_service WHERE id = $1', [id], (err, data) => {
        if(err) return response.errorResponse(
          res, 400, 'Bad Request.'
      )
      if(data.rowCount <= 0) return response.errorResponse(
        res, 404, `service with id number '${id}' not found`, data.rows,
          )  
  
        return response.successResponse(
          res, 201, 'service selected', data.rows,
        )
      })
    }


    static updateService(req, res){
      const {id} = req.params;
    const serviceId = Number(id);
    
      const {icon, heading, description} = req.body;

      try {
           const validateServiceIdQuery = 'SELECT * FROM tbl_api_service WHERE id = $1';
           pool.query(validateServiceIdQuery, [serviceId], (err, result) =>{
             if(err) return err;
             if(result.rowCount <= 0){
               return response.errorResponse(
                 res, 404, 'Service could not be found'
               )
             }
           });
           const recordExistsQuery = 'SELECT * FROM tbl_api_service WHERE heading = $1 AND id <> $2';
           pool.query(recordExistsQuery, [heading, serviceId], (err, result) =>{
             if(err) return err;
             if(result.rowCount > 0){
               return response.errorResponse(
                 res, 409, 'Record already exist.'
               )
             }
           });
      
          }

        catch(err) {
          return response.errorResponse(
            res, 500, 'Internal Server Error'
          )

        }

        finally {
          const updateServiceQuery = 'UPDATE tbl_api_service SET icon = $1, heading = $2, description = $3';
          pool.query(updateServiceQuery, [icon, heading, description, serviceId], (err, data) =>{
            if(err) return err;

            return response.successResponse(
              res, 201, 'Record Updated Successfully', {icon, heading, description}
            )
          } )
        }
    }



  static deleteService(req, res){
    const id = Number(req.params.id)
  
    pool.query('DELETE FROM tbl_api_service WHERE id = $1', [id], (err, results) => {
      if (err) return err;
      return response.successResponse(
        res, 200, `Service with ID: ${id} deleted`
      )
     
    })
  }

}


  export default serviceController;