import dotenv from 'dotenv';
import pool from '../middlewares/config';
dotenv.config();

class quoteController {

  static createQuote(req, res){
    const {companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType} = req.body
  
    pool.query('INSERT INTO quote (companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType) VALUES ($1, $2, $3, $4, $5, $6, $7)', [companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`New quote added with email: ${results.companyName}`)
    })
  }

  

  static getQuote(req, res){
    pool.query('SELECT * FROM quote ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  static getQuoteById(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM quote WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

static updateQuote(req, res){
    const id = parseInt(req.params.id)
    const { companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType } = req.body
  
    pool.query(
      'UPDATE quote SET companyName = $1, loadingSite = $2, companyName = $3, companyPhone = $4, product = $5, tonnage = $6, truckType = $7 WHERE id = $8',
      [companyName, loadingSite, companyEmail, companyPhone, product, tonnage, truckType, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`Quote modified with ID: ${id}`)
      }
    )
  }

  static deleteQuote(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM quote WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`Quote deleted with ID: ${id}`)
    })
  }

}


  export default quoteController;