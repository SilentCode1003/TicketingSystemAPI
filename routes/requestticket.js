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
  res.render("requestticket", {
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
    let status = dictionary.GetValue(dictionary.ACT());
    let sql = `select * from client_request_ticket_details where ctrd_status='${status}'`;

    mysql.Select(sql, "ClientRequestTicketDetails", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

      res.json({
        msg: "success",
        data: result,
      });
    });
  } catch (error) {
    res.json({ msg: error });
  }
});

router.post("/save", (req, res) => {
  try {
    let requestby = req.body.requestby;
    let concern = req.body.concern;
    let issue = req.body.issue;
    let description = req.body.description;
    let attachement = req.body.attachement;
    let requestdate = helper.GetCurrentDate();
    let createddate = helper.GetCurrentDatetime();
    let status = dictionary.GetValue(dictionary.ACT());
    let client_request_ticket_details = [];

    GetConcernCode(concern)
      .then((result) => {
        let code = result;

        GetCurrentCount(concern)
          .then((result) => {
            let count = result;
            let concerncode = code;
            let currentcount = count + 1;
            let requestid = `IR-${helper.GetCurrentYear()}${concerncode}${currentcount}`;

            console.log(requestid);

            client_request_ticket_details.push([
              requestid,
              requestby,
              requestdate,
              concern,
              issue,
              description,
              attachement,
              status,
              createddate,
            ]);

            mysql.InsertTable(
              "client_request_ticket_details",
              client_request_ticket_details,
              (err, result) => {
                if (err) console.error("Error: ", err);

                console.log(result);
                res.json({
                  msg: "success",
                });
              }
            );
          })
          .catch((error) => {
            return res.json({
              msg: error,
            });
          });
      })
      .catch((error) => {
        return res.json({
          msg: error,
        });
      });
  } catch (error) {
    res.json({
      msg: error,
    });
  }
});

router.post("/getrequestticketactive", (req, res) => {
  try {
    let requestby = req.body.requestby;
    let status = dictionary.GetValue(dictionary.ACT());
    let sql = `select * from client_request_ticket_details where ctrd_requestby='${requestby}' and ctrd_status='${status}'`;

    mysql.Select(sql, "ClientRequestTicketDetails", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

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

router.post("/getrequestticket", (req, res) => {
  try {
    let requestby = req.body.requestby;
    let sql = `select * from client_request_ticket_details where ctrd_requestby='${requestby}'`;

    mysql.Select(sql, "ClientRequestTicketDetails", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

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

router.post("/getrequestticketid", (req, res) => {
  try {
    let requestid = req.body.requestid;
    let sql = `select * from client_request_ticket_details where ctrd_requestid='${requestid}'`;

    mysql.Select(sql, "ClientRequestTicketDetails", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

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

router.get("/getactivecount", (req, res) => {
  try {
    let requestby = req.body.requestby;
    let status = dictionary.GetValue(dictionary.ACT());
    let sql = `select count(*) totalactive from client_request_ticket_details where ctrd_requestby='${requestby}' and ctrd_status='${status}'`;

    mysql.SelectResult(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      console.log(result);

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

router.post("/gettopconcern", (req, res) => {
  try {
    let requestby = req.body.requestby;
    let datefrom = req.body.datefrom;
    let dateto = req.body.dateto;
    let sql = `select 
    mct_concernname as concern,
    count(*) as totalcount
    from client_request_ticket_details
    inner join master_concern_type on ctrd_concern = mct_concernname
    where ctrd_requestdate between '${datefrom}' and '${dateto}'
    and ctrd_requestby = '${requestby}'
    group by mct_concernname
    order by totalcount desc limit 10`;

    mysql.SelectResult(sql, (err, result) => {
      if (err) console.error("Error: ", err);
      console.log(result);

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

router.post("/getserviceticket", (req, res) => {
  try {
    let requestid = req.body.requestid;
    let sql = `select ctd_ticketid as ticketid from request_child_ticket_detail where ctd_referenceid='${requestid}'`;

    console.log(requestid);

    mysql.SelectResult(sql, (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);

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

router.post("/searchrequestid", (req, res) => {
  try {
    let requestid = req.body.requestid;
    let requestby = req.body.requestby;
    let sql = `select * from client_request_ticket_details where ctrd_requestid='${requestid}' and ctrd_requestby='${requestby}'`;

    mysql.Select(sql, "ClientRequestTicketDetails", (err, result) => {
      if (err) console.error("Error: ", err);

      console.log(result);
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

//#region
function GetConcernCode(concernname) {
  try {
    return new Promise((resolve, rejects) => {
      let sql = `select * from master_concern_type where mct_concernname='${concernname}'`;

      console.log(sql);
      mysql.Select(sql, "MasterConcernType", (err, result) => {
        if (err) return rejects(err);

        let concerncode = result[0].concerncode;
        resolve(`${concerncode}`);
      });
    });
  } catch (error) {
    return error;
  }
}

function GetCurrentCount(concernname) {
  try {
    return new Promise((resolve, reject) => {
      let sql = `select count(*) as currentcount from client_request_ticket_details where ctrd_concern='${concernname}'`;

      mysql.SelectResult(sql, (err, result) => {
        if (err) reject(err);

        let currentcount =
          result[0].currentcount == "0" ? 0 : parseInt(result[0].currentcount);
        console.log(currentcount);
        resolve(currentcount);
      });
    });
  } catch (error) {
    return error;
  }
}
//#endregion
