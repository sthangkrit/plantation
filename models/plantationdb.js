var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const plantation = new Schema ({
    plantID: {type: String, unique: true},
    location: {type: String },
    ownerID : {type: String},
    inProgress: {type: Boolean,default:false}

});


module.exports=mongoose.model('Plantation',plantation)