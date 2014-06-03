var routes = require('../routes');

module.exports = function (app) {

    app.post('/report', routes.rest.registerRegionChange);
    app.get('/activityLog', routes.activitylog.activityReport);
}
