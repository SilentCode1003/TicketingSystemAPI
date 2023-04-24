var express = require('express');
var router = express.Router();
require('dotenv').config();


const crypt = require('./repository/cryptography');
const mysql = require('./repository/ticketingdb');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: req.session.title,
    username: req.session.username,
    fullname: req.session.fullname,
    role: req.session.role,
    position: req.session.position
  });
});

module.exports = router;

router.post('/authentication', (req, res) => {
  try {
    var username = req.body.username;
    var password = req.body.password;
    var message = "";

    crypt.Encrypter(password, (err, result) => {
      if (err) {
        console.error('Encryption Error: ', err);
      }
      console.log(result);

      // console.log(`USERNAME: ${username}`)
      let sql = `select * from master_user where mu_username='${username}' and mu_password='${result}'`;
      mysql.Select(sql, 'MasterUser', (err, result) => {
        if (err) {
          return res.json
            ({
              msg: err
            })
        }
        if (result.length != 0) {
          req.session.isAuth = true;
          req.session.username = result[0].username;
          req.session.fullname = result[0].fullname;
          req.session.role = result[0].role;
          req.session.position = result[0].position;
          req.session.title = process.env._TITLE;

          let data = [];
          data.push({
            isAuth: true,
            username: result[0].username,
            fullname: result[0].fullname,
            role: result[0].role,
            position: result[0].position
          })

          console.log(data);

          res.json({
            msg: 'success',
            data: data
          });
        }
        else {
          return res.json
            ({
              msg: 'incorrect'
            })
        }

      })
    })

  } catch (error) {
    res, json({
      msg: error
    })
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {

      res.json({
        msg: err
      });

    }

    res.json({
      msg: "success"
    })
  });

});

router.post('/adminlogin', (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;

    crypt.Encrypter(password, (err, result) => {
      if (err) {
        console.error('Encryption Error: ', err);
      }


      let sql = `select * from master_user where mu_username='${username}' and mu_password='${result}'`;
      mysql.Select(sql, 'MasterUser', (err, result) => {
        if (err) {
          return res.json
            ({
              msg: 'error',
              data: err
            })
        }

        res.json({
          msg: 'success',
          data: result
        })
      });
    });

  } catch (error) {
    res.json({
      msg: 'error',
      data: error
    })
  }
})
