var mongoose = require('mongoose')
var RegionEvent = mongoose.model('RegionEvent')


exports.activityReport = function(req,res) {

    RegionEvent.find({},function(err, events){

        console.log(events);
        res.render('activityLog',{events:events})
    });

   
}