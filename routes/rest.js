var mongoose = require('mongoose')
var RegionEvent = mongoose.model('RegionEvent')

exports.registerRegionChange = function(req,res) {
   console.log('Register'+ JSON.stringify(req.body));

   var newEvent = new RegionEvent({});

   newEvent.regionId = req.body.region;
   newEvent.username = req.body.user;
   newEvent.eventType = req.body.eventType;


   newEvent.save(function(err, savedEvent) {

    if (err) {
        
        console.error("Error saving event: "+err);
        res.send(500);

    } else {

        console.log("Saved event: "+savedEvent);
        res.send(200);
    }
   });
}