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
  // app.get('/deleteQuest', mid.requiresLogin, controllers.Domo.deleteQuest);
  app.get('/maker', mid.requiresLogin, controllers.Quest.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Quest.make);
  app.get('/getQuests', mid.requiresLogin, controllers.Quest.getQuests);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

// export the router function
module.exports = router;
