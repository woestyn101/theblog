// importing the path module
const path = require('path');

//importing express
const express = require('express');

// to use sessions
const session = require('express-session');

// to use handlebars
const exphbs = require('express-handlebars');

// set up path to routes
const routes = require('./controllers');

// set up path to helpers
const helpers = require('./utils/helpers');

// to store sessions in database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// initializing the express app
const app = express();

// settup up the port
const PORT = process.env.PORT || 3005;

// importing connection file to database
const sequelize = require('./config/connection');

// helpers for handlebars
const hbs = exphbs.create({ helpers });

// session credentials
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// setting up the middleware
app.use(session(sess));

// use handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// enable the use of json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// middleware to use routes
app.use(routes);

// syncing the models with database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});




