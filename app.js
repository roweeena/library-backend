const express = require('express');
const mongoose = require('mongoose');
const  cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require("path");

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

//middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "./mer-front/build")));
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./mer-front/build", "index.html"));
});

bookRoutes(app)
userRoutes(app)
app.listen(port);

app.use((req, res) => {
  res.status(404).send({url: `${req.originalUrl} not found`})
})

console.log(`server started at http://localhost:${port}`)
