import pool from '../middlewares/config';

const dropUsersTable = 'DROP TABLE users';
const dropQuotesTable = 'DROP TABLE quote CASCADE';
const dropCountersTable = 'DROP TABLE counter';
const dropContactsTable = 'DROP TABLE contact';
const dropsiteAppsTable = 'DROP TABLE siteapp';
const dropsiteAppsTable = 'DROP TABLE service';
const dropsiteAppsTable = 'DROP TABLE template';

async function deleteTables() {
  try {
    await pool.query(dropUsersTable);
    await pool.query(dropQuotesTable);
    await pool.query(dropCountersTable);
    await pool.query(dropContactsTable);
    await pool.query(dropsiteAppsTable);
    console.log('all tables dropped');
  } catch (error) {
    console.log('could not drop table');
  }
}

deleteTables();