var routes = require('../routes');

module.exports = function (app) {

    app.get('/', routes.activitylog.activityReport);
    app.post('/report', routes.rest.registerRegionChange);
}
