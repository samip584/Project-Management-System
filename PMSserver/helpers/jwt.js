const jwt = require('jsonwebtoken');
const { Model } = require('bookshelf');

function createToken(data){
  return jwt.sign(data, process.env.JWTSECRET)
}

module.exports ={
  createToken,
}