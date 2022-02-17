const express = require('express');
const mongoose = require('mongoose');
const  cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

dotenv.config()
global.Book = require('./api/models/bookModel');
global.User = require('./api/models/userModel');
const bookRoutes = require('./api/routes/bookRoutes')
const userRoutes = require('./api/routes/userRoutes')

mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGOLAB_URI, {useNewUrlParser: true}
)


const port = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


bookRoutes(app)
userRoutes(app)
app.listen(port);

app.use((req, res) => {
  res.status(404).send({url: `${req.originalUrl} not found`})
})

console.log(`server started at http://localhost:${port}`)
