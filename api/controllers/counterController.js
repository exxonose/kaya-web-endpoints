import dotenv from 'dotenv';
import pool from '../middlewares/config';
dotenv.config();

class counterController {

    static createCounter(req, res){
        const { amount, name } = req.body
      
        pool.query('INSERT INTO counter (amount, name) VALUES ($1, $2)', [amount, name], (error, results) => {
          if (error) {
            throw error
          }
          res.status(201).send(`Counter added with ID: ${results.insertId}`)
        })
      }    

  static getCounter(req, res){
    pool.query('SELECT * FROM counter ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  static getCounterById(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM counter WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }
  
static updateCounter(req, res){
    const id = parseInt(req.params.id)
    const { amount, name } = req.body
  
    pool.query(
      'UPDATE counter SET amount = $1, name = $2 WHERE id = $3',
      [amount, name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Counter modified with ID: ${id}`)
      }
    )
  }

  static deleteCounter(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM counter WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Counter deleted with ID: ${id}`)
    })
  }

}


  export default counterController;