const knex = require('knex')({
  client: 'pg',
  connection: { 
    password: process.env.dbPassword,
    user: process.env.dbUser,
    host: process.env.host,
    database: process.env.DB,
    port: process.env.dbPort
  }
});
const bookshelf = require('bookshelf')(knex);
module.exports.bookshelf = bookshelf;