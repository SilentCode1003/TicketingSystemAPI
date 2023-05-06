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
        let iscomment = req.body.iscomment;
        let status = dictionary.GetValue(dictionary.INACT());
        let createdby = req.session.fullname;
        let createdate = helper.GetCurrentDatetime();
        let data = [];
        let sql_check = `select * from master_filter where mf_filtername='${filtername}'`;

        mysql.Select(sql_check, 'MasterFilter', (err, result) => {
            if (err) console.error('Error: ', err);

            if (result.length != 0) {
                data = [
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
                    filtername
                ];

                Update_MasterFilter(data)
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

router.post('/apply', (req, res) => {
    try {
        let filtername = req.body.filtername;
        let updatestatus = dictionary.GetValue(dictionary.INACT());
        let status = dictionary.GetValue(dictionary.ACT());
        let sql_update = `update master_filter set mf_status='${updatestatus}' where mf_filtername != '${filtername}'`;
        let sql = `update master_filter set mf_status='${status}' where mf_filtername='${filtername}'`;

        mysql.Update(sql_update, (err, result) => {
            if (err) {
                console.error('Error: ', err);
                return es.json({
                    msg: err
                })
            }

            console.log(result);

            mysql.Update(sql, (err, result) => {
                if (err) {
                    console.error('Error: ', err);
                    return es.json({
                        msg: err
                    })
                }

                console.log(result);

                res.json({
                    msg: 'success'
                })
            })
        })

    } catch (error) {
        res.json({
            msg: error
        })
    }
})

//#region FUNCITONS
function Update_MasterFilter(data) {
    return new Promise((resolve, reject) => {
        let sql = `update master_filter 
        SET mf_isticketid='${data[0]}',
        mf_issubject='${data[1]}',
        mf_isconcern='${data[2]}',
        mf_isissue='${data[3]}',
        mf_isrequestername='${data[4]}',
        mf_isrequesteremail='${data[5]}',
        mf_isdescription='${data[6]}',
        mf_ispriority='${data[7]}',
        mf_isticketstatus='${data[8]}',
        mf_isdatecreated='${data[9]}',
        mf_isduedate='${data[10]}',
        mf_isstatusdetail='${data[11]}',
        mf_isassignto='${data[12]}',
        mf_isdepartment='${data[13]}',
        mf_isattachement='${data[14]}',
        mf_iscomment='${data[15]}',
        mf_status='${data[16]}'
        where mf_filtername='${data[17]}'`;

        mysql.Update(sql, (err, result) => {
            if (err) reject(err);
            console.log(result);
            resolve(result);
        })
    })
}
//#endregion