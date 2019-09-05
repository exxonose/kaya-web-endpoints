import dotenv from 'dotenv';
import pool from '../middlewares/config';
dotenv.config();

class contactController {

  static createContact(req, res){
    const { firstName, lastName, email, phoneNumber, message } = req.body
  
    pool.query('INSERT INTO contact (firstName, lastName, email, phoneNumber, message) VALUES ($1, $2, $3, $4, $5)', [firstName, lastName, email, phoneNumber, message], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`New contact added with email: ${results.email}`)
    })
  }

  

  static getContact(req, res){
    pool.query('SELECT * FROM contact ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  static getContactById(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM contact WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

static updateContact(req, res){
    const id = parseInt(req.params.id)
    const {firstName, lastName, email, phoneNumber, message} = req.body
  
    pool.query(
      'UPDATE contact SET firstName = $1, lastName = $2, email = $3, phoneNumber = $4, message = $5 WHERE id = $6',
      [firstName, lastName, email, phoneNumber, message, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Contact modified with ID: ${id}`)
      }
    )
  }

  static deleteContact(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM contact WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Contact deleted with ID: ${id}`)
    })
  }

}


  export default contactController;