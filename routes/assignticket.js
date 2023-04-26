var express = require('express');
var router = express.Router();

const mysql = require('./repository/ticketingdb');
const helper = require('./repository/customhelper');
const dictionary = require('./repository/dictionary');
const crypt = require('./repository/cryptography');

function isAuthAdmin(req, res, next) {

    if (req.session.isAuth && req.session.role == "ADMINISTRATOR" && req.session.position == "DEVELOPER") {
        next();
    }
    else {
        res.redirect('/login');
    }
};

/* GET home page. */
router.get('/', isAuthAdmin, function (req, res, next) {
    res.render('assignticket', {
        title: req.session.title,
        username: req.session.username,
        fullname: req.session.fullname,
        role: req.session.role,
        position: req.session.position
    });
});

module.exports = router;

router.get('/load', (req, res) => {
    try {
        let sql = `select * from request_ticket_detail`;

        mysql.Select(sql, 'RequestTicketDetail', (err, result) => {
            if (err) {
                return res.json({
                    msg: err
                })
            }

            console.log(helper.GetCurrentDatetime());

            res.json({
                msg: 'success',
                data: result
            })
        });
    } catch (error) {
        res.json({
            msg: error
        })
    }
})

router.post('/save', (req, res) => {
    try {
        let concerntype = req.body.concerntype;
        let issuetype = req.body.issuetype;
        let requestername = req.body.requestername;
        let requesteremail = req.body.requesteremail;
        let description = req.body.description;
        let prioritytype = req.body.prioritytype;
        let ticketstatus = req.body.ticketstatus;
        let assignedto = req.body.assignedto;
        let attachment = req.body.attachment == undefined ? 'NO ATTACHMENT' : req.body.attachment;
        let department = req.body.department;
        let comment = req.body.comment;
        let duedate = 'number of days base on priority';
        let statusdetail = 'Due in 3 days';
        let status = dictionary.GetValue(dictionary.ACT());
        let createdby = req.session.fullname;
        let createdate = helper.GetCurrentDatetime();
        let data = [];

        console.log(attachment);

        GetConcernCode(concerntype)
            .then(result => {
                let code = result;

                GetCurrentCount(concerntype)
                    .then(result => {
                        let count = result;
                        let concerncode = code;
                        let currentcount = count + 1;
                        let ticketid = `${helper.GetCurrentYear()}${helper.GetCurrentMonth()}${helper.GetCurrentDay()}${concerncode}${currentcount}`;
                        let subject = `${concerntype}[${requestername}]${ticketid}`

                        data.push([
                            ticketid,
                            subject,
                            concerntype,
                            issuetype,
                            requestername,
                            requesteremail,
                            description,
                            prioritytype,
                            ticketstatus,
                            createdate,
                            duedate,
                            statusdetail,
                            assignedto,
                            department,
                            attachment,
                            comment
                        ])

                        console.log(data);

                        mysql.InsertTable('request_ticket_detail', data, (err, result) => {
                            if (err) console.error('Error: ', err);

                            console.log(result);

                            res.json({
                                msg: 'success',
                            })
                        })
                    })
                    .catch(error => {

                    })


            })
            .catch(error => {
                return res.json({
                    msg: error
                })
            })
    }
    catch (error) {
        res.json({
            msg: error
        })
    }
})

//#region FUNCTION
function GetConcernCode(concernname) {
    try {
        return new Promise((resolve, rejects) => {
            let sql = `select * from master_concern_type where mct_concernname='${concernname}'`;

            console.log(sql);
            mysql.Select(sql, 'MasterConcernType', (err, result) => {
                if (err) return rejects(err);

                let concerncode = result[0].concerncode;
                resolve(`${concerncode}`);
            })
        })

    } catch (error) {
        return error;
    }
}

function GetCurrentCount(concernname) 
{
    try {
        return new Promise((resolve, reject) => {
            let sql = `select count(*) as currentcount from request_ticket_detail where td_concern='${concernname}'`;

            mysql.SelectResult(sql, (err, result) => {
                if (err) reject(err);

                let currentcount = result[0].currentcount == '0' ? 0 : parseInt(result[0].currentcount)
                console.log(currentcount);
                resolve(currentcount);
            })
        })

    } catch (error) {
        return error
    }
}
  //#endregion