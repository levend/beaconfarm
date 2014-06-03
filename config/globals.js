module.exports = function (app) {
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.set('secret', 'thisiasfk23fpom23pcomsmyapp')
  app.set('mongo', process.env['MONGO_DB'] || 'mongodb://beaconfarm:beaconfarm@ds063168.mongolab.com:63168/heroku_app25989031')
  app.set('env',   process.env['NODE_ENV'] || 'development')

  if (app.get('env') == 'development') {
    console.info('We are in DEVELOPMENT environment');

    app.set('baseUrl', 'http://localhost:'+app.get('port')+'/');

  } else {
    
    console.info('We are in PRODUCTION environment');
    
    app.set('baseUrl', 'http://buildnumbers.com/');
  }
}