const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');


const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3005;

const sequelize = require('./config/connection');
const hbs = exphbs.create({ helpers });

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

app.use(session(sess));
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




