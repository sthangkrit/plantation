const mongoose = require('mongoose')
const adduser = require('../models/userdb')
const addplantation = require('../models/plantationdb')
const addplan = require('../models/docplan')
const progresstime = require('../models/docprogress')
const addproduct = require('../models/docproduct')
const docprogress = require('../models/docprogress')
//const addupdateAction = require('..models/')
const connect = require('./mongoose')


//module.exports = plantation;

class plantation {
    //adduser
    async adduser(req) {
        var member =
        {
            userID: req.ID,
            userName: req.NAME.toLowerCase(),
            tel: req.TEL
        }
        var resultplant = await new connect().checkexist({ PlantID: req.PlantID }, "plantationdb")
        console.log(resultplant)
        //เช็คplantID มาลงทะเบียนยัง
        if (resultplant) {
        } else {
            return "have plantID"
        }
        var resultowner = await new connect().checkexist({ userID: req.OwnerID }, "userdb")
        console.log(resultowner)
        //เช็คOwnerIDว่ามีตรงกับUserID
        if (!resultowner) {
        } else {
            return "You are not Member"
        }
        var result = await add.save()
        console.log(result)
        return plantation
    }//function    

    //plan   
    async plan(req) {
        var json = req;
        //ดึงข้อมูลจาก DataBase
        // var idUser = 61050254444
        const plan = new addplan(
            {
                PlantID: req.PlantID,
                Location: req.Location.toLowerCase(),
                OwnerID: req.OwnerID.toLowerCase()
            })
        //เช็คจำนวน plantID
        if (req.PlantID.length != 10) {
            return "plantID id not correct"
        }
        //เช็คจำนวน OwnerID
        if (req.OwnerID.length != 13) {
            return "ownerID id not correct"
        }
        var resultplant = await new connect().compare({ PlantID: req.PlantID }, "plantationdb")
        console.log(resultplant)
        //เช็คplantID มาลงทะเบียนยัง
        if (!resultplant) {
            return "have plantID"
        }
        var resultowner = await new connect().compare({ userID: req.OwnerID }, "userdb")
        console.log(resultowner)
        //เช็คOwnerIDว่ามีตรงกับUserID
        if (!resultowner) {
            return "You are not Member"
        }
        var result = await plantation.save()
        console.log(result)
        return plantation
    }
    async updateAction(req) {
        var moment = require('moment')
        var result = await new connect().get({ progressID: req.progressID }, 'docprogress')
        console.log(result[0].action)

        var date = moment().format('DD/MM/YYYY')
        console.log(date)

        var time = moment().format('h:mm:ss a')
        console.log(time)

        var action = {
            userID: req.userID,
            name: req.name,
            time: time,
            date: date
        }

        result[0].action.push(action)

        var result1 = await new connect().update(
            {progressID: req.progressID},
            'docprogress',
            {
                action: result[0].action,
                update: date + ',' + time
            })


        return result1
    }


    async progresstime(req) {
        var moment = require('moment')
        var planID = { planID: req.planID }
        var Docplan = await new connect().get(planID, "docplan") // รับจาก DB Plantation
        if (Docplan.error) {
            return Docplan.error
        }

        var Planprocesstime = Docplan[0].processTime // รับจากDB Docplan
        var planID = Docplan[0].planID // รับจาก DB Docplan
        var plantationID = req.plantationID//"1234" //ดูจาก plantation
        var startDate = moment().add(0, 'days').format('DD/MM/YYYY,h:mm:ss a') //รับจากเวลาเครื่อง
        var endDate = moment().add(Planprocesstime, 'days').format('DD/MM/YYYY,h:mm:ss a')
        var update = moment().add(0, 'days').format('DD/MM/YYYY,h:mm:ss a')

        

        var keyplant = { plantID: req.plantationID }
        var plantation = await new connect().get(keyplant, "plantationdb")
        //เช็คว่ามีแปลนจริงมั้ย
        if (plantation.error) {
            return plantation.error
        }


        //check plantation ว่าว่างหรือไม่ว่าง true ไม่ว่าง false ว่าง
        plantation = plantation[0].inProgress
        if (plantation) {
            //console.log('hello')
            return "Error Plantation in progress "
        }
        //console.log(JSON.stringify(req.member))

        // check user
        for (var i = 0; i < req.member.length; i++) {
            //await req.Member.forEach(async function (member) {
            console.log(req.member[i].userID)
            let key = { userID: req.member[i].userID }
            let checkMember = await new connect().checkexist(key, "userdb")
            console.log("11 " + checkMember)
            if (!checkMember) {
                console.log("some1")
                return "someone is not user"
            }

        } //);
        try {
            var progress = await new docprogress({
                progressID: req.progressID,
                startDate: startDate,
                endDate: endDate,
                plantationID: plantationID,  //รับจาก 2 
                planID: planID,  // รับจาก3
                member: req.member,
                action: req.action,
                update: update,
                endorse: req.endorse,
                status: req.status

            })
        } catch (err) {
            console.log(err)
        }

        console.log(progress)
        var result = await progress.save().catch(err => {
            console.log(err)
        })
        await new connect().update( {},'plantationdb',{inProgress: true})

        return result
    }
    async product(req) {
        var getprogressid = await new connect().get({ progressID: req.progressID}, "docprogress")
        var checkproductid = await new connect().checkexist({ productID: req.productID }, "docproduct")
        var checkstatus = await new connect().checkexist({status:"ready to send"},"docprogress")
        if (!checkstatus || checkproductid) {
            return "This ID has exist"
        }
        else {
            const product = new addproduct({
                productID: req.productID,
                progressID: req.progressID,
                owner: req.owner,
                to: req.to
            })
            var prod = await product.save()
            var getplant = getprogressid[0].plantationID
            var updateinprogress = await new connect().update({plantID:getplant},'plantationdb',{inProgress:"false"})
            var updatestatus = await new connect().update({progressID: req.progressID},'docprogress',{status: "send product"})
            return product
        }
    }
    // diffDate
    diffDate(startDate, endDate) {
        var moment = require('moment')
        startDate = moment(startDate, "DD/MM/YYYY"); //todays date
        endDate = moment(endDate, "DD/MM/YYYY"); // another date
        var duration = moment.duration(startDate.diff(endDate));
        var days = duration.asDays();
        return Math.abs(days)
    }

    async checkEvent(req) {
        //getData
        var docProgress = await new connect().get({ progressID: req.progressID }, "docprogress")
        var docPlan = await new connect().get({ planID: docProgress[0].planID }, "docplan")
        console.log(docProgress)
        console.log(docPlan)
        var startDate = docProgress[0].startDate
        var endDate = docProgress[0].endDate
        var Planprocesstime = docPlan[0].processTime
        var diffDate = new plantation().diffDate(startDate, endDate)
        var status = docProgress[0].status
        var endorse = req.userID
        var member = docProgress[0].member
        var event = docPlan[0].event
        var action = docProgress[0].action
        var timeStart = docPlan[0].event
        var timeEnd = action
        console.log('Status: ${status}')
        console.log('Planprocesstime: ${Planprocesstime}')
        console.log('Endorse: ${endorse}')
        console.log('EndDate: ${endDate}')
        console.log('DiffDate: ${diffDate}')
        console.log('EventLength : ${event.length}')
        console.log('ActionLength : ${action.length}')
        console.log('timeEnd : ${timeEnd[1].date}')
        //check length
        if (event.length != action.length) {
        return "Error: Data inValid"
        }
        //check status
        // if(status != "wait check"){
        // return "Status : inValid require status: waitCheck"
        // }
        //check คนตรวจ กับ คนในเเปลง
        //await member.forEach(element => {
        for(var i = 0; i < member.length;i++)
        if (endorse == member[i].userID) {
        // console.log(endorse + " AA" + member[i].userID)
        //new connect().update({ progressID: req.progressID }, {status: 'Not ready to send products' }, "docprogress")
        return "No premition"
        }
        
            for (var i = 0; i < event.length; i++) {
                //check กิจกรรมที่ทำของเเผนการเกษตรกับใบขอทำการเกษตร
                if (event[i].name != action[i].name) {
                    console.log(`Event: ${event[i].name}`)
                    console.log(`Action: ${action[i].name}`)
                    return `Endorse: ${endorse} => การปฏิบัติไม่ตรงกัน`
                }
                //check ช่วงเวลาเเต่ละการปฏิบัติ
                var diffTime = new plantation().diffDate(startDate, timeEnd[i].date)
                console.log(`diffTime: ${diffTime}`)
                if (timeStart[i].time != diffTime) {
                    console.log(timeStart[i].time + 'aaa' + diffTime)
                    return `Endorse: ${endorse} => ระยะเวลาในการฏิบัติไม่ตรงกัน`
        
                }
            }
            //check ระยะเวลาการดำเนินการ
        
        
            if (diffDate == Planprocesstime) {
        
                docProgress[0].endorse.push({ userID: endorse })
                console.log(JSON.stringify(docProgress[0].endorse))
                await new connect().update({ progressID: req.progressID }, { endorse: docProgress[0].endorse, status: 'ready to send' }, "docprogress")
            }
            else await new connect().update({ progressID: req.progressID }, { status: 'not ready to send' }, "docprogress")
        }
        }

module.exports = plantation
