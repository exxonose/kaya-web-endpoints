
import { Pool } from 'pg';
import dotenv from 'dotenv';
import '@babel/polyfill';
import configToken from '../../configToken';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});
    

export default pool;
