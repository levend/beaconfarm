var mongoose = require('mongoose')
var RegionEvent = mongoose.model('RegionEvent')

exports.registerRegionChange = function(req,res) {
   console.log('Register');

   var newEvent = new RegionEvent({});
   newEvent.regionId = "Region_1";
   newEvent.username = "Balazs";
   newEvent.eventType = "Enter";


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