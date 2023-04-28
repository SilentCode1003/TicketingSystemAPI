var express = require('express');
var router = express.Router();

const mysql = require('./repository/ticketingdb');
const helper = require('./repository/customhelper');
const dictionary = require('./repository/dictionary');
const crypt = require('./repository/cryptography');
const { json } = require('body-parser');

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
    res.render('filter', {
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
        let sql = `select * from master_filter`;

        mysql.Select(sql, 'MasterFilter', (err, result) => {
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
        let filtername = req.body.filtername;
        let isticketid = req.body.isticketid;
        let issubject = req.body.issubject;
        let isconcern = req.body.isconcern;
        let isissue = req.body.isissue;
        let isrequestername = req.body.isrequestername;
        let isrequesteremail = req.body.isrequesteremail;
        let isdescription = req.body.isdescription;
        let ispriority = req.body.ispriority;
        let isticketstatus = req.body.isticketstatus;
        let isdatecreated = req.body.isdatecreated;
        let isduedate = req.body.isduedate;
        let isstatusdetail = req.body.isstatusdetail;
        let isassignto = req.body.isassignto;
        let isdepartment = req.body.isdepartment;
        let isattachement = req.body.isattachement;
        let iscomment = req.body.filtername;
        let status = dictionary.GetValue(dictionary.ACT());
        let createdby = req.session.fullname;
        let createdate = helper.GetCurrentDatetime();
        let data = [];
        let sql_check = `select * from master_filter where mf_filtername='${filtername}'`;

        mysql.Select(sql_check, 'MasterFilter', (err, result) => {
            if (err) console.error('Error: ', err);

            if (result.length != 0) {
                data.push([
                    isticketid,
                    issubject,
                    isconcern,
                    isissue,
                    isrequestername,
                    isrequesteremail,
                    isdescription,
                    ispriority,
                    isticketstatus,
                    isdatecreated,
                    isduedate,
                    isstatusdetail,
                    isassignto,
                    isdepartment,
                    isattachement,
                    iscomment
                ]);

                Update_MasterFilter(data, filtername)
                    .then(result => {

                        console.log(result);
                        return res.json({
                            msg: 'success'
                        });
                    })
                    .catch(error => {
                        res, json({
                            msg: error
                        })
                    });
            }
            else {
                data.push([
                    filtername,
                    isticketid,
                    issubject,
                    isconcern,
                    isissue,
                    isrequestername,
                    isrequesteremail,
                    isdescription,
                    ispriority,
                    isticketstatus,
                    isdatecreated,
                    isduedate,
                    isstatusdetail,
                    isassignto,
                    isdepartment,
                    isattachement,
                    iscomment,
                    status,
                    createdby,
                    createdate
                ]);

                mysql.InsertTable('master_filter', data, (err, result) => {
                    if (err) console.error(err);

                    res.json({
                        msg: 'success'
                    })
                });
            }
        })
    } catch (error) {
        res.json({
            msg: error
        })
    }
})

//#region FUNCITONS
function Update_MasterFilter(data, filtername) {
    return new Promise((resolve, reject) => {
        let sql = `update master_filter 
        SET mf_isticketid=?,
        mf_issubject=?,
        mf_isconcern=?,
        mf_isissue=?,
        mf_isrequestername=?,
        mf_isrequesteremail=?,
        mf_isdescription=?,
        mf_ispriority=?,
        mf_isticketstatus=?,
        mf_isdatecreated=?,
        mf_isduedate=?,
        mf_isstatusdetail=?,
        mf_isassignto=?,
        mf_isdepartment=?,
        mf_isattachement=?,
        mf_iscomment=?,
        mf_status=?
        where mf_filtername='${filtername}'`;

        mysql.UpdateMultiple(sql, data, (err, result) => {
            if (err) reject(err);
            console.log(result);
            resolve(result);
        })
    })
}
//#endregion