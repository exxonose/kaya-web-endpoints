import dotenv from 'dotenv';
import pool from '../middlewares/config';
import response from '../middlewares/response';
dotenv.config();

class templateController {

  static createTemplate(req, res){
    const {phoneNumber, email, address, companyName, companyLogo, facebook, twitter, instagram, linkedin, aboutUs, services, copyRight} = req.body;
    try {
      const query = 'SELECT * FROM tbl_api_template WHERE phonenumber = $1'; 
      pool.query(query, [phoneNumber], (err, data) => {
        if(err) return err;
        if(data.rowCount > 0){
          return response.errorResponse(
              res, 409, `${phoneNumber} already exists`
          );
        }
      })
    }

    catch(err) {
      return response.errorResponse(
          res, 500, 'Internal Server Error.'
 
      ) }

      finally {

        const insertQuery = 'INSERT INTO tbl_api_template (phonenumber, email, address, companyname, companylogo, facebook, twitter, instagram, linkedin,about_us_subheader, service_subheader, copyright) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id';
        pool.query(insertQuery, [phoneNumber, email, address, companyName, companyLogo, facebook, twitter,instagram, linkedin, aboutUs, services, copyRight], (err, data) => {
          if(err) return err;
          const { id } = data.rows[0];
          return response.successResponse(
            res, 201, ` template with ${email} successfully added`, 
            {id, phoneNumber, email, address, companyName, companyLogo, facebook, twitter, instagram, linkedin, aboutUs, services, copyRight}
          )   
        }) 
     }
  }
  

  static getTemplate(req, res){
    pool.query('SELECT * FROM tbl_api_template ORDER BY id ASC', (err, data) => {
      if (err) return err;
      return response.successResponse(
        res, 201, 'All template contents', data.rows,
      )   
    })
  }

  static getTemplateById(req, res){
    const id = Number(req.params.id)
      pool.query('SELECT * FROM tbl_api_template WHERE id = $1', [id], (err, data) => {
        if(err) return response.errorResponse(
          res, 400, 'Bad Request.'
      )
      if(data.rowCount <= 0) return response.errorResponse(
        res, 404, `template with id number '${id}' not found`, data.rows,
          )  
  
        return response.successResponse(
          res, 201, 'template selected', data.rows,
        )
      })
    }


    static updateTemplate(req, res){
      const {id} = req.params;
    const tempId = Number(id);
    
      const {phoneNumber, email, address, companyName, companyLogo, facebook, twitter,instagram, linkedin, aboutUs, services, copyRight} = req.body

      try {
           const validateTemplateIdQuery = 'SELECT * FROM tbl_api_template WHERE id = $1';
           pool.query(validateTemplateIdQuery, [tempId], (err, result) =>{
             if(err) return err;
             if(result.rowCount <= 0){
               return response.errorResponse(
                 res, 404, 'Template could not be found'
               )
             }
           });
           const recordExistsQuery = 'SELECT * FROM tbl_api_template WHERE email = $1 AND id <> $2';
           pool.query(recordExistsQuery, [email, tempId], (err, result) =>{
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
          const updateTemplateQuery = 'UPDATE tbl_api_template SET phonenumber = $1, email = $2, address = $3, companyname = $4, companylogo = $5, facebook = $6, twitter = $7, instagram = $8, linkedin = $9, about_us_subheader = $10, service_subheader = $11, copyright = $12';
          pool.query(updateTemplateQuery, [phoneNumber, email, address, companyName, companyLogo, facebook, twitter,instagram, linkedin, aboutUs, services, copyRight, tempId], (err, data) =>{
            if(err) return err;
            
            return response.successResponse(
              res, 201, 'Record Updated Successfully', {phoneNumber, email, address, companyName, companyLogo, facebook, twitter, instagram, linkedin, aboutUs, services, copyRight}
            )
          } )
        }
    }



  static deleteTemplate(req, res){
    const id = Number(req.params.id)
  
    pool.query('DELETE FROM tbl_api_template WHERE id = $1', [id], (err, results) => {
      if (err) return err;
      return response.successResponse(
        res, 200, `Template with ID: ${id} deleted`
      )
     
    })
  }

}


  export default templateController;