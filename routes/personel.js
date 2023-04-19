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
  res.render('personel', {
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
    let sql = `select * from master_personel`;

    mysql.Select(sql, 'MasterPersonel', (err, result) => {
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
    let departmentlist = req.body.departmentlist;
    let locationlist = req.body.locationlist;
    let role = req.body.rolelist;
    let position = req.body.positionlist;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createdate = helper.GetCurrentDatetime();
    let data = [];
    let sql_check = `select * from master_personel where mp_fullname='${fullname}'`;

    mysql.Select(sql_check, 'MasterPersonel', (err, result) => {
      if (err) console.error('Error:', err);

      if (result.length != 0) {
        return res.json({
          msg: 'exist'
        });
      }
      else {
        data.push([
          fullname,
          departmentlist,
          role,
          position,
          locationlist,
          status,
          createdby,
          createdate
        ])

        console.log(data);
        mysql.InsertTable('master_personel', data, (err, result) => {
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
      }
    })

  } catch (error) {
    res.json({
      msg: error
    })
  }
})