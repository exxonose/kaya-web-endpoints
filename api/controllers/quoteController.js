import dotenv from 'dotenv';
import pool from '../middlewares/config';
import response from '../middlewares/response';
dotenv.config();

class quoteController {

  static createQuote(req, res){
    const {companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType} = req.body;
    try {
      const query = 'SELECT * FROM quote WHERE companyname = $1'; 
      pool.query(query, [companyName], (err, data) => {
        if(err) return err;
        if(data.rowCount > 0){
          return response.errorResponse(
              res, 409, `${companyName} already exists`
          );
        }
      })
    }

    catch(err) {
      return response.errorResponse(
          res, 500, 'Internal Server Error.'
 
      ) }

      finally {

        const insertQuery = 'INSERT INTO quote (companyname, loadingsite, companyemail, companyphone, product, tonnage, trucktype) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
        pool.query(insertQuery, [companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType], (err, data) => {
          if(err) return err;
          const { id } = data.rows[0];
          return response.successResponse(
            res, 201, `${companyName} successfully added to quote`, 
            { id, companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType}
          )   
        }) 
     }
  }
  

  static getQuote(req, res){
    pool.query('SELECT * FROM quote ORDER BY id ASC', (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 201, 'All counter items', data.rows,
      )   
    })
  }

  static getQuoteById(req, res){
    const id = Number(req.params.id)
      pool.query('SELECT * FROM quote WHERE id = $1', [id], (err, data) => {
        if(err) return response.errorResponse(
          res, 400, 'Bad Request.'
      )
      if(data.rowCount <= 0) return response.errorResponse(
        res, 404, `quote with id number '${id}' not found`, data.rows,
          )  
  
        return response.successResponse(
          res, 201, 'quote selected', data.rows,
        )
      })
    }


    static updateQuote(req, res){
      const {id} = req.params;
    const quoteId = Number(id)
    
      const { companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType } = req.body

      try {
           const validateQuoteIdQuery = 'SELECT * FROM quote WHERE id = $1';
           pool.query(validateQuoteIdQuery, [quoteId], (err, result) =>{
             if(err) return err;
             if(result.rowCount <= 0){
               return response.errorResponse(
                 res, 404, 'Quote could not be found'
               )
             }
           })
      }

        catch(err) {
          return response.errorResponse(
            res, 500, 'Internal Server Error'
          )

        }

        finally {
          const updateQuoteQuery = 'UPDATE quote SET companyname = $1, loadingsite = $2, companyemail = $3, companyphone = $4, product = $5, tonnage = $6, trucktype = $7 WHERE id = $8';
          pool.query(updateQuoteQuery, [companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType, quoteId], (err, data) =>{
            if(err) return err;

            return response.successResponse(
              res, 201, 'Record Updated Successfully', {companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType}
            )
          } )
        }
    }



  static deleteQuote(req, res){
    const id = Number(req.params.id)
  
    pool.query('DELETE FROM quote WHERE id = $1', [id], (err, results) => {
      if (err) return err;
      return response.successResponse(
        res, 200, `Quote with ID: ${id} deleted`
      )
     
    })
  }

}


  export default quoteController;