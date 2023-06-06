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
  res.render("client", {
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
    let sql = `select * from master_client`;

    mysql.Select(sql, "MasterClient", (err, result) => {
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
    let email = req.body.email;
    let contactno = req.body.contactno;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createdate = helper.GetCurrentDatetime();
    let data = [];
    let sql_check = `select * from master_client where mc_fullname='${fullname}'`;

    mysql.Select(sql_check, "MasterClient", (err, result) => {
      if (err) console.error("Error: ", err);

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
            email,
            contactno,
            status,
            createdby,
            createdate,
          ]);
        });

        console.log(data);
        mysql.InsertTable("master_client", data, (err, result) => {
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

router.post("/excelsave", (req, res) => {
  try {
    let data = req.body.data;
    let status = dictionary.GetValue(dictionary.ACT());
    let createdby = req.session.fullname;
    let createddate = helper.GetCurrentDatetime();
    data = JSON.parse(data);
    master_client = [];

    data.forEach((key, item) => {
      let fullname = `${key.storeno} ${key.storename}`;
      let username = key.storename;
      let password = "";

      if (key.contact == null) console.log(`${key.storeno}`);

      crypt.Encrypter(username, (err, result) => {
        if (err) return res.json({ msg: err });

        password = result;

        master_client.push([
          fullname,
          username,
          password,
          key.email,
          key.contact,
          status,
          createdby,
          createddate,
        ]);
      });
    });

    mysql.InsertTable("master_client", master_client, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          msg: "error",
          error: err,
        });
      } else {
        console.log(result);

        res.json({
          msg: "success",
        });
      }
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
