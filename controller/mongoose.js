
class connect {

//get data
    async get(key, collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(key)
        console.log(result)
        if (!result[0]) {
            var error = {
                error: "error : key not found key : ",
                keygit : key,
                collectionName: collectionName
            }
            return error
        }
        return result
    }
    //updateuser
    async update(conditions, update, collectionName, options) {
        const Collection = require('../models/' + collectionName)
        var result = await Collection.find(conditions)
        Collection.update(conditions, update);
        if (!result[0]) {
            var error = {
                error: "error : key not found key : ",
                update: conditions,
                collectionName: collectionName
            }
            return error
        }
        else {
            var resultupdate = Collection.findOneAndUpdate(conditions, update, options)
            return resultupdate
        }
    }

    //compare data(ture/flase)
    
//checkexist data(ture/flase)
    async checkexist(key,collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(key)
        console.log(result)
        if(result[0]){ return true }
        else { return false }      
    }

    //delete data 
    async delete(key,collectionName){
        const Collection = require('../models/'+collectionName)
        var result = await Collection.find(key)
        if (!result[0]) {
            var error = {
                error: "error : key not found key : ",
                key: key,
                collectionName: collectionName
            }
            return error
        } else {
            var result = await Collection.remove(key)
            console.log(result)
            return result
        }
    }
    //update
    async update(key, collectionName, value) {
        const Collection = require('../models/' + collectionName)
        var result = await Collection.find(key)
        if (!result[0]) {
            var error = {
                error: "error : key not found key : ",
                key: key,
                collectionName: collectionName
            }
            return error
        } else {
            console.log(result)
        }
        var resultup = await Collection.update(key, { $set: value })
        return resultup
    }

    //compare data(ture/flase)
    // async compare(key, collectionName) {
    //     const Collection = require('../models/' + collectionName)
    //     var result = await Collection.find(key)
    //     console.log(result)
    //     if (!result[0]) { return true }
    //     else { return false }
    // }

}
module.exports = connect