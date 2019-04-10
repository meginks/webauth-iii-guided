const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const secrets = require('../config/secrets.js'); 
const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  // token is commonly sent as the authorization header
 const token = req.headers.authorization; 

 if (token) {
  jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
    if (err) {
      // the token is invalid 
      res.status(401)
      .json({message: 'your token is garbage'})
    } else {
      // the token is valid 
      req.decodedJWT = decodedToken // make available to the rest of the API 
      console.log('decoded token', req.decodedJwt);
      next(); // because this is middleware 
    }
  }) 
 } else {
   // no token 
   res.status(500)
   .json({message: 'No shoes. No token. No service.'})
 }
};
