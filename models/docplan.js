var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const docplan = new Schema ({
    planID: {type: String, unique: true},
    event: {type: Array },
    name: {type: String },
    processTime : {type: Intl }
});



module.exports=mongoose.model('Docplan',docplan)
