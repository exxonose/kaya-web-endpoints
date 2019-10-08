import dotenv from 'dotenv';
import pool from '../middlewares/config';
import response from '../middlewares/response';
dotenv.config();

class userController {

  static createUser(req, res){
    const { fullName, email, password, address, phoneNumber } = req.body
    try {
      const query = 'SELECT * FROM tbl_api_users WHERE (email = $1 OR phonenumber = $2)'; 
      pool.query(query, [email, phoneNumber], (err, data) => {
        if(err) return err;
        if(data.rowCount > 0){
          return response.errorResponse(
              res, 409, `Record already exists `
          );
        }
      })
    }

    catch(err) {
      return response.errorResponse(
          res, 500, 'Internal Server Error.'
 
      ) }

      finally {

        const insertQuery = 'INSERT INTO tbl_api_users (fullname, email, password, address, phonenumber) VALUES ($1, $2, $3, $4, $5) RETURNING id';
        pool.query(insertQuery, [fullName, email, password, address, phoneNumber], (err, data) => {
          if(err) return err;
          const { id } = data.rows[0];
          return response.successResponse(
            res, 201, `${fullName} with email address ${email} has been successfully added to users`, 
            { id, fullName, email, password, address, phoneNumber}
          )   
        }) 
     }
    }

  static getUsers(req, res){
    pool.query('SELECT * FROM tbl_api_users ORDER BY id ASC', (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 201, 'All users', data.rows,
      )   
    })
  }

  static getUserById(req, res){
    const id = Number(req.params.id)
    pool.query('SELECT * FROM tbl_api_users WHERE id = $1', [id], (err, data) => {
      if(err) return response.errorResponse(
        res, 400, 'Bad Request.'
    )
    if(data.rowCount <= 0) return response.errorResponse(
      res, 404, `user with id number '${id}' not found`, data.rows,
        )  

      return response.successResponse(
        res, 201, 'user selected', data.rows,
      ) 
    })
  } 


static updateUser(req, res){
  const {id} = req.params;
  const userId = Number(id);
  const {fullName, email, password, address, phoneNumber } = req.body

  try {
  const validateUserQuery = 'SELECT * FROM tbl_api_users WHERE id = 1$';
  pool.query(validateUserQuery, [userId], (err, data) =>{
    if(err) return err;
    if(data.rowCount <= 0){
      return response.errorResponse(
        res, 404, 'User could not be found',
      )
    }
  });
    
  const recordExistsQuery = 'SELECT * FROM tbl_api_users WHERE (email = $1 OR phonenumber = $2) AND id <> $3';
  pool.query(recordExistsQuery, [email, phoneNumber, userId], (err, result) =>{
    if(err) return err;
    if(result.rowCount > 0){
      return response.errorResponse(
        res, 409, 'Record already exist.'
      )
    }
  })
    
  } 
  catch(err){
    return response.errorResponse(
      res, 505, 'Internal Server Error'
    )

  }

  finally {
    const updateUserQuery = 'UPDATE tbl_api_users SET fullname = $1, email = $2, password = $3, address = $4, phonenumber = $5  WHERE id = $6';
    pool.query(updateUserQuery, [fullName, email, password, address, phoneNumber, userId], (err, data) =>{
      if(err) return err;

      return response.successResponse(
        res, 200, 'Record Successfully Updated', {fullName, email, password, address, phoneNumber}
      )
    })
  }
}


  static deleteUser(req, res){
    const id = Number(req.params.id)
  
    pool.query('DELETE FROM tbl_api_users WHERE id = $1', [id], (err, results) => {
      if (err) return err;
      return response.successResponse(
        res, 200, `User with ID: ${id} deleted`
      )
    })
  }

}


  export default userController;