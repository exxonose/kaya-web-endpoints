import {Pool} from 'pg';

const pool = new Pool({
  user: 'ose',
  host: 'localhost',
  database: 'api',
  password: 'ose123',
  port: 5432,
})

export default pool;