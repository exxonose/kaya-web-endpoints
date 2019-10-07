import dotenv from 'dotenv';
import pool from '../middlewares/config';
import response from '../middlewares/response';
dotenv.config();

class contactController {

  static createContact(req, res){
    const { firstName, lastName, email, phoneNumber, message } = req.body
    try {
      const query = 'SELECT * FROM tbl_api_contact WHERE email = $1'; 
      pool.query(query, [email], (err, data) => {
        if(err) return err;
        if(data.rowCount > 0){
          return response.errorResponse(
              res, 409, `${email} already exists`
          );
        }
      })
    }

    catch(err) {
      return response.errorResponse(
          res, 500, 'Internal Server Error.'
 
      ) }

      finally {

        const insertQuery = 'INSERT INTO tbl_api_contact (firstname, lastname, email, phonenumber, message) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        pool.query(insertQuery, [firstName, lastName, email, phoneNumber, message], (err, data)  => {
          if(err) return err;
          const { id } = data.rows[0];
          return response.successResponse(
            res, 201, `${email} successfully added to contact list`, 
            { id, firstName, lastName, email, phoneNumber, message}
          )   
        }) 
     }
  }

  

  static getContact(req, res){
    pool.query('SELECT * FROM tbl_api_contact ORDER BY id ASC', (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 201, 'Full contact list', data.rows,
      )
    })
  }

  static getContactById(req, res){
    const id = Number(req.params.id)
    pool.query('SELECT * FROM tbl_api_contact WHERE id = $1', [id], (err, data) => {
     if(err) return response.errorResponse(
        res, 400, 'Bad Request.'
    )
    if(data.rowCount <= 0) return response.errorResponse(
      res, 404, `contact with id number '${id}' not found`, data.rows,
        )  

      return response.successResponse(
        res, 201, 'contact selected', data.rows,
      )
    }) 
  }

  static updateContact(req, res){
    const {id} = req.params;
    const contactId = Number(id)
    
    const {firstName, lastName, email, phoneNumber, message} = req.body

    try {
      const validateContactQuery = 'SELECT * FROM tbl_api_contact WHERE id = $1';
      pool.query(validateContactQuery, [contactId], (err, data) =>{
        if(err) return err;
        if(data.rowCount <= 0){
          return response.errorResponse(
            res, 404, 'Contact could not be found'
          )
        }
      })

    }
    catch(err){
      return response.errorResponse(
        res, 500, 'Internal Server Error'
      )
    }

    finally {
      const updateContactQuery = 'UPDATE tbl_api_contact SET firstname = $1, lastname = $2, email = $3, phonenumber = $4, message = $5 WHERE id = $6';
      pool.query(updateContactQuery, [firstName, lastName, email, phoneNumber, message, contactId], (err, data) => {
        if(err) return err;

        return response.successResponse(
          res, 201, 'Record Successfully Updated', {firstName, lastName, email, phoneNumber, message} )
      })

    }
  }

  static deleteContact(req, res){
    const id = Number(req.params.id)
  
    pool.query('DELETE FROM tbl_api_contact WHERE id = $1', [id], (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 200, `Contact with ID: ${id} deleted`
      )
     
    })
  }

}


  export default contactController;