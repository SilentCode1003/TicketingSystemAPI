var express = require('express');
var router = express.Router();

const mysql = require('./repository/ticketingdb');
const helper = require('./repository/customhelper');
const dictionary = require('./repository/dictionary');
const crypt = require('./repository/cryptography');
const { GetConcernCode } = require('./concern');


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
        let conernname = req.body.concername;
        // let concerntype = req.body.concerntype;
        // let issuetype = req.body.issuetype;
        // let requestername = req.body.requestername;
        // let requesteremail = req.body.requesteremail;
        // let description = req.body.description;
        // let prioritytype = req.body.prioritytype;
        // let ticketstatus = req.body.ticketstatus;
        // let assignedto = req.body.assignedto;
        // let attachement = req.body.attachement;
        // let department = req.body.department;
        // let comment = req.body.comment;
        // let concerncode = GetConcernCode(concerntype);
        // let ticketid = `${helper.GetCurrentYear()}${helper.GetCurrentMonth()}${helper.GetCurrentDay}${concerncode}${'currentcount'}`;
        // let subject = `${concerntype}[${requestername}]${ticketid}`
        // let duedate = 'number of days base on priority';
        // let statusdetail = 'Due in 3 days';
        // let status = dictionary.GetValue(dictionary.ACT());
        // let createdby = req.session.fullname;
        // let createdate = helper.GetCurrentDatetime();
        // let data = [];

        // data.push([
        //     ticketid,
        //     subject,
        //     concerntype,
        //     issuetype,
        //     requestername,
        //     'requesteremail',
        //     description,
        //     prioritytype,
        //     'ticketstatus',
        //     createdate,
        //     'duedate',
        //     statusdetail,
        //     assignedto,
        //     department,
        //     'attachement',
        //     'comment'
        // ])

        // console.log(data);

        res.json({
            msg: 'success',
        })

    } catch (error) {
        res.json({
            msg: error
        })
    }
})