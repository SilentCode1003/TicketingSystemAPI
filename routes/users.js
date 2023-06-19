var express = require("express");
var router = express.Router();

const mysql = require("./repository/ticketingdb");
const helper = require("./repository/customhelper");
const dictionary = require("./repository/dictionary");
const crypt = require("./repository/cryptography");

function isAuthAdmin(req, res, next) {
  if (
    req.session.isAuth &&
    req.session.role == "ADMINISTRATOR" &&
    req.session.position == "DEVELOPER"
  ) {
    next();
  } else {
    res.redirect("/login");
  }
}

/* GET home page. */
router.get("/", isAuthAdmin, function (req, res, next) {
  res.render("users", {
    title: req.session.title,
    username: req.session.username,
    fullname: req.session.fullname,
    role: req.session.role,
    position: req.session.position,
  });
});

module.exports = router;

router.get("/load", (req, res) => {
  try {
    let sql = `select * from master_user`;

    mysql.Select(sql, "MasterUser", (err, result) => {
      if (err) {
        return res.json({
          msg: err,
        });
      }

      res.json({
        msg: "success",
        data: result,
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/save", (req, res) => {
  try {
    let fullname = req.body.fullname;
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.rolelist;
    let position = req.body.positionlist;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createdate = helper.GetCurrentDatetime();
    let data = [];
    let sql_check = `select * from master_user where mu_fullname='${fullname}'`;

    mysql.Select(sql_check, "MasterUser", (err, result) => {
      if (err) console.error("Error:", err);

      if (result.length != 0) {
        return res.json({
          msg: "exist",
        });
      } else {
        crypt.Encrypter(password, (err, result) => {
          if (err) console.error("Encryption Error: ", err);

          console.log(result);

          data.push([
            fullname,
            username,
            result,
            role,
            position,
            status,
            createdby,
            createdate,
          ]);
        });

        console.log(data);
        mysql.InsertTable("master_user", data, (err, result) => {
          if (err) {
            return res.json({
              msg: err,
            });
          }

          console.log(result);

          res.json({
            msg: "success",
          });
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/update", (req, res) => {
  try {
    let fullname = req.body.fullname;
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;

    crypt.Encrypter(oldpassword, (err, oldencrpty) => {
      if (err) console.error("Error: ", err);
      let sql_check = `select * from master_user where mu_fullname='${fullname}' and mu_password='${oldencrpty}'`;

      mysql.isDataExist(sql_check, "MasterUser").then((result) => {
        if (!result) {
          res.json({
            msg: "incorrect",
          });
        } else {
          crypt.Encrypter(newpassword, (err, encrypted) => {
            if (err) console.error("Error: ", err);
            let sql = `update master_user set mu_password='${encrypted}' where mu_fullname='${fullname}'`;

            console.log(encrypted);

            mysql.Update(sql, (err, result) => {
              if (err) console.error("Error: ", err);

              console.log(result);
              res.json({
                msg: "success",
              });
            });
          });
        }
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
