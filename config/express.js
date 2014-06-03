var express = require('express');

module.exports = function (app) {
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser(app.get('secret')));
  app.use(express.session({ secret: app.get('secret') }));
  app.use(function (req, res, next) { res.locals.site_title = app.get('title'); next(); })
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));

  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
}
