var express = require('express');
var router = express.Router();

const mysql = require('./repository/ticketingdb');
const helper = require('./repository/customhelper');
const dictionary = require('./repository/dictionary');
const crypt = require('./repository/cryptography');

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
  res.render('users', {
    title: 'Ticketing System',
    username: 'creator'
    // user: req.session.username,
    // password: req.session.passowrd,
    // fullname: req.session.fullname,
    // accounttype: req.session.accounttype
  });
});

module.exports = router;


router.get('/load', (req, res) => {
  try {
    let sql = `select * from master_user`;

    mysql.Select(sql, 'MasterUser', (err, result) => {
      if (err) {
        return res.json({
          msg: err
        })
      }

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
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = crypt.Encrypter(req.body.password);
    let role = req.body.role;
    let position = req.body.position;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.username;
    let createdate = helper.GetCurrentDatetime();
    let data = [];

    data.push([
      fullname,
      username,
      password,
      role,
      position,
      status,
      createdby,
      createdate
    ])

    mysql.InsertTable('master_user', data, (err, result) => {
      if (err) {
        return res.json({
          msg: err
        })
      }

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