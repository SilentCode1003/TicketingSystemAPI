var express = require('express');
var router = express.Router();


const crypt = require('./repository/cryptography');
const mysql = require('./repository/ticketingdb');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Ticketing System',
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

    // console.log(`USERNAME: ${username}`)
    let sql = `select * from master_user where mu_username='${username}' and mu_password='${password}'`;
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
      }
      else{
        return res.json
          ({
            msg: 'incorrect'
          })
      }

    })

    message = "error";
    files.forEach(file => {

      var filename = `${UserPath}/${file}`;
      var data = helper.ReadJSONFile(filename);

      data.forEach((key, item) => {

        if (key.username == username) {
          message = 'success';

          console.log(`user:${key.username} password:${key.password}`);

          crypt.Decrypter(key.password, (err, result) => {
            if (err) throw err;

            console.log(result);
          })

          crypt.Encrypter(password, (err, result) => {
            if (err) console.log(err);

            console.log(result);

            if (key.password == result) {
              req.session.isAuth = true;
              req.session.username = key.username;
              req.session.accounttype = key.accounttype;
              req.session.fullname = key.fullname;
            }
            else {
              message = 'error';
            }
          });

        }
      })
    })
    console.log(message);

    if (message == "success") {
      res.json({
        msg: message
      });
    }

    if (message == "error") {
      res.json({
        msg: 'error'
      });
    }


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
