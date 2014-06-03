var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = mongoose.Schema.ObjectId;
var Mixed    = Schema.Types.Mixed

var RegionEvent = new Schema({
    regionId : String,
    timestamp : {type : Date, default: Date.now},
    username : String,
    eventType :  String
});

RegionEvent = exports = mongoose.model('RegionEvent', RegionEvent);