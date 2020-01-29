import dotenv from 'dotenv';
import pool from '../middlewares/config';
import response from '../middlewares/response';
dotenv.config();

class counterController {

    static createCounter(req, res){
        const { amount, name } = req.body

        // validate if the user is authenticated
        // validate for non empty fields
        // validate if record exists,

        try {
          const query = 'SELECT * FROM tbl_api_counter WHERE name = $1';
          pool.query(query, [name], (err, data) => {
            if(err) return err;
            if(data.rowCount > 0){
              return response.errorResponse(
                  res, 409, `${name} already exists`
              );
            }
          })
        }
 
        catch(err) {
          return response.errorResponse(
              res, 500, 'Internal Server Error.'
     
          ) }
 
          finally {

            const insertQuery = 'INSERT INTO tbl_api_counter (amount, name, created_on) VALUES ($1, $2, $3) RETURNING id';
            pool.query(insertQuery, [amount, name, dateCreated], (err, data) => {
              if(err) return err;
              const { id } = data.rows[0];
              return response.successResponse(
                res, 201, `${name} successfully added to Counter`, 
                { id, name, amount}
              )   
            }) 
         }
    }   

  static getCounter(req, res){
      pool.query('SELECT * FROM tbl_api_counter ORDER BY id ASC', (err, data) => {
        if (err) return err;
        return response.successResponse(
          res, 201, 'All counter items', data.rows,
        )   
      })
    }

  static getCounterById(req, res){
    const id = Number(req.params.id)
      pool.query('SELECT * FROM tbl_api_counter WHERE id = $1', [id], (err, data) => {
        if(err) return response.errorResponse(
          res, 400, 'Bad Request.'
      )
      if(data.rowCount <= 0) return response.errorResponse(
        res, 404, `counter item with id number '${id}' not found`, data.rows,
          )  
  
        return response.successResponse(
          res, 201, 'counter selected', data.rows,
        )
      })
    }
  
  static updateCounter(req, res) {
    const {id} = req.params;
    const counterId = Number(id)
    const { amount, name } = req.body;
    try{
      const validateCounterIdQuery = 'SELECT * FROM tbl_api_counter WHERE id = $1';
      pool.query(validateCounterIdQuery, [counterId], (err, result)=>{
        if(err) return err;
        if(result.rowCount <= 0){
          return response.errorResponse(
            res, 404, 'The counter record could not be found'
          )
        }
      });

      const recordExistsQuery = 'SELECT * FROM tbl_api_counter WHERE name = $1 AND id <> $2';
      pool.query(recordExistsQuery, [name, counterId], (err, reply)=> {
        if(err) return err;
        if(reply.rowCount > 0 ) {
          return response.errorResponse(
            res, 409, 'Record already exists.'
          )
        }
      }); 
    } 
    catch(err) {
      return response.errorResponse(
          res, 500, 'Internal Server Error.'
      )
  }
    finally{
      const updateCountQuery = 'UPDATE tbl_api_counter SET amount = $1, name = $2 WHERE id = $3';
      pool.query(updateCountQuery, [amount, name, counterId], (err, data) => {
        if(err) return err;

        return response.successResponse(
          res, 201, 'Record Updated Successfully', {amount, name}
        )
      })
    } 
  }

    

  static deleteCounter(req, res){
    const id = Number(req.params.id)
  
    pool.query('DELETE FROM tbl_api_counter WHERE id = $1', [id], (err, results) => {
      if (err) return err;
      return response.successResponse(
        res, 200, `Counter with ID: ${id} deleted`
      )
     
    })
  }

}


  export default counterController;