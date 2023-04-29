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
    res.render('ticketcomment', {
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
        let sql = `select * from ticket_comment`;

        mysql.Select(sql, 'TicketComment', (err, result) => {
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

router.post('/getticketcomment', (req, res) => {
    try {
        let ticketid = req.body.ticketid;
        let sql = `call ticketing.GetTicketComments('${ticketid}')`;

        mysql.StoredProcedureResult(sql, (err, result) => {
            if (err) console.error('Error: ', err);

            console.log(result);

            res.json({
                msg: 'success',
                data: result
            })
        })

    } catch (error) {
        res.json({
            msg: error
        })
    }
})

router.post('/save', (req, res) => {
    try {
        let ticketid = req.body.ticketid;
        let comment = req.body.comment;
        let attachment = req.body.attachment;
        let commentby = req.body.commentby;
        let status = dictionary.GetValue(dictionary.ACT());
        let commentdate = helper.GetCurrentDatetime();
        let data = [];

        data.push([
            ticketid,
            comment,
            attachment,
            status,
            commentby,
            commentdate
        ])

        mysql.InsertTable('ticket_comment', data, (err, result) => {
            if (err) console.error('Error: ', err);

            console.log(result);

            res.json({
                msg: 'success'
            });
        })
    } catch (error) {
        res.json({
            msg: error
        });
    }
})