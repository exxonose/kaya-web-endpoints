import pool from '../../config';

class siteController {
  static getSiteApp(req, res){
    pool.query('SELECT * FROM siteApp ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  static getSiteAppById(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('SELECT * FROM siteApp WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  static createSiteApp(req, res){
    const { name, email } = req.body
  
    pool.query('INSERT INTO siteApp (name) VALUES ($1)', [name], (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).send(`siteApp added with ID: ${result.insertId}`)
    })
  }

  
static updateSiteApp(req, res){
    const id = parseInt(req.params.id)
    const { name} = req.body
  
    pool.query(
      'UPDATE siteApp SET name = $1 WHERE id = $2',
      [name, id],
      (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).send(`siteApp modified with ID: ${id}`)
      }
    )
  }

  static deleteSiteApp(req, res){
    const id = parseInt(req.params.id)
  
    pool.query('DELETE FROM siteApp WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User deleted with ID: ${id}`)
    })
  }

}


  export default siteController;