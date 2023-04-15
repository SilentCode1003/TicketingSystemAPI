var express = require('express');
var router = express.Router();

const mysql = require('./repository/ticketingdb');
const helper = require('./repository/customhelper');
const dictionary = require('./repository/dictionary');

function isAuthAdmin(req, res, next) {

  if (req.session.isAuth && req.session.accounttype == "CREATOR") {
    next();
  }
  else {
    res.redirect('/login');
  }
};

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('roles', {
    title: 'Ticketing System',
    username: 'CREATOR',
    // password: req.session.passowrd,
    // fullname: req.session.fullname,
    // accounttype: req.session.accounttype
  });
});

module.exports = router;

router.get('/load', (req, res) => {
  try {
    let sql = `select * from master_role`;

    mysql.Select(sql, 'MasterRole', (err, result) => {
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
    let rolename = req.body.rolename;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = 'CREATOR';
    let createdate = helper.GetCurrentDatetime();
    let data = [];

    data.push([
      rolename,
      status,
      createdby,
      createdate
    ])

    mysql.InsertTable('master_role', data, (err, result) => {
      if (err) console.error(err);

      res.json({
        msg: 'success'
      })
    });

  } catch (error) {
    res.json({
      msg: error
    })
  }
})