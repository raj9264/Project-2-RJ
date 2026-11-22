const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {

    app.get('/getGames', mid.requiresLogin, controllers.Game.getGames);
    app.post('/addGame', mid.requiresLogin, controllers.Game.addGame);

    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout,  controllers.Account.login);

    app.post('/signup', mid.requiresSecure, mid.requiresLogout,  controllers.Account.signup);

    app.get('/logout', mid.requiresSecure, mid.requiresLogout,  controllers.Account.logout);
    app.get('/', mid.requiresSecure, mid.requiresLogout,  controllers.Account.loginPage);
};

module.exports = router;
