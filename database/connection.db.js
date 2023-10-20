const knex = require('knex');
const config = require('../configs/config_dev');
const db = knex(config[process.env.NODE_ENV]);

class Database {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await db.raw('SELECT 1+1 as result');
      console.log('Database Connection success');
      return db;
    } catch (error) {
      console.error('Error connecting to the database:', error);
      return false;
    }
  }
  static getInstance() {
    if (!Database.instance) {
      return Database.instance = new Database()
    }
    return Database.instance
  }
}
const connectDBInstance = Database.getInstance();
module.exports = {
  connectDBInstance,
  db
};
