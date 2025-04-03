const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes/routes');
const cookieParser = require('cookie-parser');


const app = express();

app.use(express.static('public'));
app.use(cookieParser())
app.use(express.json());

app.set('view engine', 'ejs');

const dbURI = "mongodb+srv://kudakai:Theansweris43@cluster0.ge6bi.mongodb.net/AuthApp?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(dbURI)
  .then((result) => app.listen(3500))
  .catch((err) => console.log(err));

// routes
app.use(Router)


app.use((req, res, next) => {
  res.send("OOPS 404 not found")
})