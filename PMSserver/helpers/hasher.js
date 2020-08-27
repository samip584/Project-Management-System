const crypto = require("crypto");

function genRandomString(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') 
          .slice(0,length);  
};


function sha512(password, salt){
  let hash = crypto.createHmac('sha512', salt); 
  hash.update(password);
  let value = hash.digest('hex');
  return {
      salt:salt,
      passwordHash:value
  };
};

function HashPassword(userpassword) {
  let salt = genRandomString(16); 
  let passwordData = sha512(userpassword, salt);
  return{
    hash: passwordData.passwordHash,
    salt: passwordData.salt,
  }
}

module.exports  = {
  HashPassword,
  sha512,
}