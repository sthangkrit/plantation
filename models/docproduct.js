var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const docproduct = new Schema ({
    productID : {type: String, unique: true},
    progressID : {type: String },
    owner : {type: String },
    to : {type: String}

});


module.exports=mongoose.model('Docproduct',docproduct)
