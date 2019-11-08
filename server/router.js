// import the controllers
// This only specifies the folder name, which means it will automatically pull the index.js file
const controllers = require('./controllers');
const mid = require('./middleware');

// function to attach routes
const router = (app) => {
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/deleteQuest', mid.requiresLogin, controllers.Domo.deleteQuest);
  app.get('/maker', mid.requiresLogin, controllers.Domo.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Domo.make);
  app.get('/getDomos', mid.requiresLogin, controllers.Domo.getDomos);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

// export the router function
module.exports = router;
