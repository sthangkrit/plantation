//var config =require('./config')
var mongoose = require('mongoose')
const url ='mongodb+srv://development:ZGFMzUvDJ745GFDq@clustermaster-zvis2.mongodb.net/plantation?retryWrites=true&w=majority';
module.exports =  function () {

    // console.log('config :'+);
    mongoose.set('debug :', true);
    // console.log('process.env.NODE.ENV  :'+process.env.NODE.ENV);

    console.log('mongoUri :'+url);
    var db = mongoose.connect(url,
        { useNewUrlParser : true}
    );

    require('../models/docprogress');
    require('../models/docplan');
    require('../models/docproduct');
    require('../models/userdb');
    require('../models/plantationdb');
    

    return db

}