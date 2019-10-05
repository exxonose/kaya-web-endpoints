import pool from '../middlewares/config';
import users from '../models/usersdb';
import quote from '../models/quotedb';
import counter from '../models/counterdb';
import contact from '../models/contactusdb';
import siteApp from '../models/siteappdb';
import service from '../models/servicedb';
import template from '../models/templatedb';

const Tables = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phonenumber VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS siteapp( 
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS contact(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(255) NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
  );
CREATE TABLE IF NOT EXISTS quote(
  id SERIAL PRIMARY KEY NOT NULL,
  companyname VARCHAR(50) NOT NULL,
  loadingsite VARCHAR(50) NOT NULL,
  companyemail VARCHAR(50) NOT NULL,
  companyphone VARCHAR(50) NOT NULL,
  product VARCHAR(50) NOT NULL,
  tonnage VARCHAR(50) NOT NULL,
  trucktype VARCHAR(50) NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS counter(
  id SERIAL PRIMARY KEY NOT NULL,
  amount INT NOT NULL,
  name VARCHAR(50) NULL,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS service(
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(50) NULL,
  icon VARCHAR(50) NULL,
  heading VARCHAR(50) NULL,
  description TEXT,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS template(
  id SERIAL PRIMARY KEY NOT NULL,
  phonenumber VARCHAR(50) NULL,
  email VARCHAR(50) NOT NULL,
  address VARCHAR(50),
  companyname VARCHAR(50) NULL,
  companylogo BLOB NOT NULL,
  facebook VARCHAR(50) NOT NULL,
  twitter VARCHAR(50) NOT NULL,
  copyright TEXT,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
)`;

const queryDb = async (query) => {
const res = await pool.query(query);
return res;
};

const create = async (arr, table) => {
try {
  await pool.query(Tables);
  for (let i = 0, len = arr.length; i < len; i += 1) {
    const values = Object.values(arr[i]);
    const keys = Object.keys(arr[i]);
    const query = `INSERT INTO ${table} (${keys}) VALUES (${values})`;
    queryDb(query);
  }
} catch (error) {
  const { log } = console;
  log(error);
}
};

const createAllTables = async () => {
try {
  await create(users, 'users');
  await create(counter, 'counter');
  await create(siteApp, 'siteapp');
  await create(contact, 'contact');
  await create(quote, 'quote');
  await create(service, 'service');
  await create(template, 'template');
  console.log('all tables has been created');
} catch (error) {
  console.log(error);
}
};

createAllTables();