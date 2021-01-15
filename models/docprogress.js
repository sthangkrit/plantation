var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const subAction = new Schema ({
    userID : { type: String },
    name : {type: String},
    date : {type : String},
    time : {type : String}
})

const subMember = new Schema ({
    userID : { type: String }
})

const subEndores = new Schema({
    userID : {type : String}
})

const docProgress = new Schema({
    progressID: { type: String, unique: true },
    startDate: { type: String },
    endDate: { type: String },
    plantationID: { type: String },
    planID: { type: String },
    member: [subMember],
    action: [ subAction ],    
    update: { type: String },
    endorse: [subEndores],
    status: { type: String }
});

module.exports = mongoose.model('DocProgress', docProgress)