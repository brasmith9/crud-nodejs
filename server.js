const express = require("express");
const path = require("path");
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
const bodyParser = require("body-parser");



/*
|--------------------------------------------------------------------------
| Create an instance of the express module
|--------------------------------------------------------------------------
|
| Express is a minimal and flexible Node.js web application framework that 
| provides a robust set of features for web and mobile applications.
|
*/

const app = express();


/*
|--------------------------------------------------------------------------
| Setup a default template engine
|--------------------------------------------------------------------------
*/

app.set('views', path.join(__dirname, './resources/views'));
app.set('view engine', 'hbs');


/*
|--------------------------------------------------------------------------
| Setup a body parser
|--------------------------------------------------------------------------
*/

app.use(bodyParser.json());

app.use(express.json());

app.use(cors(corsOptions));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

const userApi = require("./routes/api/user");

app.use('/', userApi);

module.exports = app