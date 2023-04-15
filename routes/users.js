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
    let password = req.body.password;
    let role = req.body.rolelist;
    let position = req.body.positionlist;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = 'CREATOR';
    let createdate = helper.GetCurrentDatetime();
    let data = [];

    crypt.Encrypter(password, (err, result) => {
      if (err) console.error('Encryption Error: ', err);

      console.log(result)

      data.push([
        fullname,
        username,
        result,
        role,
        position,
        status,
        createdby,
        createdate
      ])
    })

    console.log(data);
    mysql.InsertTable('master_user', data, (err, result) => {
      if (err) {
        return res.json({
          msg: err
        })
      }

      console.log(result);

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