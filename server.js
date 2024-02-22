const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

// Import model to sync table with database
const User = require('./models/User');
const Blogpost = require('./models/Blogpost');
const Comment = require('./models/Comment');


const app = express();
const PORT = process.env.PORT || 3005;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Controllers 

app.use(require('./controllers/home'));
app.use(require('./controllers/signup'));
app.use(require('./controllers/signin'));
app.use(require('./controllers/dashboard'));
app.use(require('./controllers/logout'));

// sync sequelize models to the database, then turn on the server

// sequelize.authenticate()
// .then(() =>{
//     console.log("Connection successful");
// })
// .catch((err)=>{
//     console.log(err);
// })


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});




