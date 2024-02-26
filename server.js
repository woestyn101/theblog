const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

// Import model to sync table with database
// const User = require('./models/User');
// const Blogpost = require('./models/Blogpost');
// const Comment = require('./models/Comment');


const app = express();
const PORT = process.env.PORT || 3005;

const sequelize = require('./config/connection');
const hbs = exphbs.create();
// put helpers above herenm
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Controllers 

// app.use(require('./controllers/home-routes'));
// app.use(require('./controllers/signup'));
// app.use(require('./controllers/signin'));
// app.use(require('./controllers/dashboard-routes'));
// app.use(require('./controllers/logout'));

// sync sequelize models to the database, then turn on the server

// sequelize.authenticate()
// .then(() =>{
//     console.log("Connection successful");
// })
// .catch((err)=>{
//     console.log(err);
// })

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});




