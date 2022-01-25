require('dotenv').config();


// let whitelist = [`http://127.0.0.1:${process.env.PORT}`, `http://localhost:${process.env.PORT}`]
let whitelist = ['*']
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

module.exports = corsOptions;
 