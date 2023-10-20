require('dotenv').config();
// PATH UNLESS ROUTES DOES NOT REQUIRED AUTHORIZATION
module.exports = {
    path: [
         '/sign-in',
         '/sign-up',
         '/refresh-token'
    ],
    development: {
        client: 'mysql2',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
        },
        pool: {
          min: 2 ,max: 50
        }
    },
    production: {
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST_PRO,
        user: process.env.DB_USER_PRO,
        password: process.env.DB_PASSWORD_PRO,
        database: process.env.DB_DATABASE_PRO,
        
      }
    }
}