import dotenv from 'dotenv';
import pool from '../middlewares/config';
import response from '../middlewares/response';
dotenv.config();

class siteController {
  static createSiteApp(req, res){
    const { name} = req.body
    try {
      const query = 'SELECT * FROM tbl_api_siteapp WHERE name = $1'; 
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

        const insertQuery = 'INSERT INTO tbl_api_siteapp (name) VALUES ($1) RETURNING id';
        pool.query(insertQuery, [name], (err, data) => {
          if(err) return err;
          const { id } = data.rows[0];
          return response.successResponse(
            res, 201, `${name} with id '${id}' has been successfully added to siteapp`, 
            { id,name}
          )   
        }) 
     }
    }

  static getSiteApp(req, res){
    pool.query('SELECT * FROM tbl_api_siteapp ORDER BY id ASC', (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 201, 'All Menus', data.rows,
      )   
    })
  }

  static getSiteAppById(req, res){
    const id = Number(req.params.id)
    pool.query('SELECT * FROM tbl_api_siteapp WHERE id = $1', [id], (err, data) => {
      if(err) return response.errorResponse(
        res, 400, 'Bad Request.'
    )
    if(data.rowCount <= 0) return response.errorResponse(
      res, 404, `siteapp with id number '${id}' not found`, data.rows,
        )  

      return response.successResponse(
        res, 201, 'siteapp selected', data.rows,
      ) 
    })
  } 

  static updateSiteApp(req, res){
    const {id} = req.params
    const siteId = Number(id);
    const {name} = req.body
  
  try {
    const validateSiteAppQuery = 'SELECT * FROM tbl_api_siteapp WHERE id = $1';
    pool.query(validateSiteAppQuery, [siteId], (err, data) =>{
      if(err) return err;
      if(data.rowCount <= 0){
        return response.errorResponse(
          res, 404, 'SiteApp could not be found',
        )
      }
    });
     const recordExistsQuery = 'SELECT * FROM tbl_api_siteapp WHERE name = $1 AND id <> $2';
     pool.query(recordExistsQuery, [name, siteId], (err, result) =>{
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
      const updateSiteAppQuery = 'UPDATE tbl_api_siteapp SET name = $1 WHERE id = $2';
      pool.query(updateSiteAppQuery, [name, siteId], (err, data) =>{
        if(err) return err;
  
        return response.successResponse(
          res, 200, 'Record Successfully Updated', {name}
        )
      })
  
    }
  }

  static deleteSiteApp(req, res){
    const id = Number(req.params.id)
  
    pool.query('DELETE FROM tbl_api_siteapp WHERE id = $1', [id], (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 200, `Site Application with ID: ${id} deleted`
      )
    })
  }

}


  export default siteController;