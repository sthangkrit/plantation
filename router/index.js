module.exports = function (app) {
    var index = require('../controller/plantation')

//adduser
    app.post('/adduser',async(req, res) =>{
    var result = (await new index().adduser(req.body))
    res.json(result)
    })

//plantation  
    app.post('/addplantation',async(req, res) => {
    var result = (await new index().addplantation(req.body))
    res.json(result)
    })

    //Product
    app.post('/product',async function(req,res){
        var result = await new index().product(req.body)
        res.json(result)
    })

//plan
    app.post('/plan',async(req, res) =>{
    var result = (await new index().plan(req.body))
    res.json(result)
    })

//Progress
    app.post('/progresstime',async(req, res) =>{
        var result = await new index().progresstime(req.body)
        res.json(result)
    })

//update Action
    app.post('/updateAction',async(req, res) =>{
        var result = await new index().updateAction(req.body)
        res.json(result)
    })

 //checkEvent
    app.post('/checkEvent',async(req, res) =>{
        var result = await new index().checkEvent(req.body)
        res.json(result)
    })   

}
