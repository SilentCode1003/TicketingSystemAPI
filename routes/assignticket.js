var express = require('express');
var router = express.Router();

const mysql = require('./repository/ticketingdb');
const helper = require('./repository/customhelper');
const dictionary = require('./repository/dictionary');
const crypt = require('./repository/cryptography');
const moment = require('moment');

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
        let status = dictionary.GetValue(dictionary.RSD());
        let sql = `select * from request_ticket_detail where not td_ticketstatus='${status}'`;

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

router.post('/getticketstatus', (req, res) => {
    try {
        let status = req.body.ticketstatus;
        let sql = `select * from request_ticket_detail where td_ticketstatus='${status}'`;

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
        // let duedate = 'number of days base on priority';
        // let statusdetail = 'Due in 3 days';
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

                        GetDueDate(prioritytype)
                            .then(result => {
                                let duedate = result;
                                let statusdetail = `Due in ${helper.SubtractDayTime(moment(createdate).format('YYYY-MM-DD'), moment(duedate).format('YYYY-MM-DD'))} days`;

                                console.log(statusdetail)

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
                            .catch()
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

router.get('/view', (req, res) => {
    try {
        let sql = `select * from request_ticket_detail`;

        mysql.Select(sql, 'RequestTicketDetail', (err, result) => {
            if (err) {
                return res.json({
                    msg: err
                })
            }

            console.log(helper.GetCurrentDatetime());
            var data = [];
            result.forEach((key, item) => {
                data.push({
                    ticketid: key.ticketid,
                    subject: key.subject,
                    concern: key.concern,
                    issue: key.issue,
                    requestername: key.requestername,
                    requesteremail: key.requesteremail,
                    description: key.description,
                    priority: key.priority,
                    ticketstatus: key.ticketstatus,
                    datecreated: key.datecreated,
                    duedate: key.duedate,
                    statusdetail: key.statusdetail,
                    assignedto: key.assignedto,
                    department: key.department,
                    comment: key.comment,
                })
            });

            res.json({
                msg: 'success',
                data: data
            })
        });

    } catch (error) {
        res.json({
            msg: error
        })
    }
})

router.post('/updateticket', (req, res) => {
    try {
        let ticketid = req.body.ticketid;
        let newticketstatus = req.body.ticketstatus;
        let commentby = req.body.commentby;
        let commentdate = helper.GetCurrentDatetime();
        let sql_getstatus = `select td_ticketstatus as previousticketstatus from request_ticket_detail where td_ticketid='${ticketid}'`;
        let data = [];

        mysql.SelectResult(sql_getstatus, (err, result) => {
            if (err) console.error('Error: ', err);
            let previousticketstatus = result[0].previousticketstatus;

            data.push([
                ticketid,
                previousticketstatus,
                newticketstatus,
                commentby,
                commentdate
            ]);

            mysql.InsertTable('ticket_update', data, (err, result) => {
                if (err) console.error('Error: ', err);

                console.log(result);
            })

            let sql_updaterequestticketdetail = `update request_ticket_detail set td_ticketstatus='${newticketstatus}' where td_ticketid='${ticketid}'`;

            mysql.Update(sql_updaterequestticketdetail, (err, result) => {
                if (err) console.error('Error: ', err);

                console.log(result);
            })

            res.json({
                msg: 'success'
            })
        })

    } catch (error) {
        res.json({
            msg: error
        })
    }
})

router.post('/getticket', (req, res) => {
    try {
        let ticketid = req.body.ticketid;
        let sql = `select * from request_ticket_detail where td_ticketid='${ticketid}'`;

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

function GetCurrentCount(concernname) {
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

function GetDueDate(priority) {
    return new Promise((resolve, reject) => {
        let sql = `select mpd_day as day, mpd_hour as hour from master_priority_due where mpd_priorityname='${priority}'`;

        mysql.SelectResult(sql, (err, result) => {
            if (err) reject(err);

            console.log(`${result[0].day} ${result[0].hour}`);

            var futuredate = helper.AddDayTime(result[0].day, result[0].hour)

            resolve(futuredate);
        })
    })
}
  //#endregion