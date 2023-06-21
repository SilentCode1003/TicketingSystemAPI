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
  res.render("knowledge", {
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
    let sql = `select * from knowledge_base`;

    mysql.Select(sql, "KnowledgeBase", (err, result) => {
      if (err) console.error("Error: ", err);

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
    let title = req.body.title;
    let category = req.body.category;
    let content = req.body.content;
    let attachements = req.body.attachements;
    let status = dictionary.GetValue(dictionary.ACT());
    let postby = req.body.postby;
    let postdate = helper.GetCurrentDatetime();
    let knowledge_base = [];
    let master_category = [];

    knowledge_base.push([
      title,
      category,
      content,
      attachements,
      status,
      postby,
      postdate,
    ]);

    let sql_check = `select * from master_category where mc_categoryname='${category}'`;
    mysql
      .isDataExist(sql_check, "MasterCategory")
      .then((result) => {
        if (result) {
          //not new data
        } else {
          //new data
          let createddate = postdate;
          let createdby = postby;
          master_category.push([category, status, createdby, createddate]);

          mysql.InsertTable(
            "master_category",
            master_category,
            (err, result) => {
              if (err) console.error("Error: ", err);

              console.log(result);
            }
          );
        }
      })
      .catch((error) => {
        return res.json({
          msg: error,
        });
      });

    mysql.InsertTable("knowledge_base", knowledge_base, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
      res.json({
        msg: "success",
      });
    });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});
