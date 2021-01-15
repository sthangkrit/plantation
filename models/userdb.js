var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userdb = new Schema ({
    userID: {type: String, unique: true},
    userName: String,
    tel: {type: String, index:true}

});


module.exports=mongoose.model('User',userdb)