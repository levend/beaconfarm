var moment = require('moment');

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

RegionEvent.methods.localTime = function(){
    return moment(this.timestamp).format("YYYY-MM-DD HH:mm:ss");
    //return "alma";
};

RegionEvent = exports = mongoose.model('RegionEvent', RegionEvent);