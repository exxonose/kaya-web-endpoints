import dotenv from 'dotenv';
import pool from '../middlewares/config';
dotenv.config();

class userController {

  static createUser(req, res){
    const { fullName, email, password, address, phoneNumber } = req.body
  
    pool.query('INSERT INTO users (fullName, email, password, address, phoneNumber) VALUES ($1, $2, $3, $4, $5)', [fullName, email, password, address, phoneNumber], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`User added with email: ${results.email}`)
    })
  }
  

  static getUsers(req, res){
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  static getUserById(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

static updateUser(req, res){
    const id = parseInt(req.params.id)
    const {fullName, email, password, address, phoneNumber } = req.body
  
    pool.query(
      'UPDATE users SET fullName = $1, email = $2, password = $3, address = $4, phoneNumber = $5  WHERE id = $6',
      [fullName, email, password, address, phoneNumber, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`User modified with ID: ${id}`)
      }
    )
  }

  static deleteUser(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }

}


  export default userController;