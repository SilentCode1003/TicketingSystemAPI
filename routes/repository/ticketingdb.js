const mysql = require("mysql");
const model = require("../model/ticketingmodel");
require("dotenv").config();
const crypt = require("./cryptography");

let password = "";
crypt.Decrypter(process.env._PASSWORD, (err, result) => {
  if (err) throw err;

  password = result;
  console.log(`${result}`);
});

const connection = mysql.createConnection({
  host: process.env._HOST,
  user: process.env._USER,
  password: password,
  database: process.env._DATABASE,
});

crypt.Encrypter("#Ebedaf19dd0d", (err, result) => {
  if (err) console.error("Error: ", err);

  console.log(result);
});

// crypt.Decrypter('f6a3287039d0d75cb83cb29d35b3dfcb', (err, result) => {
//     if (err) console.error('Error: ', err);

//     console.log(`${result}`);
// });

exports.CheckConnection = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connection to MYSQL databases: ", err);
      return;
    }
    console.log("MySQL database connection established successfully!");
  });
};

exports.InsertMultiple = async (stmt, todos) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(`statement: ${stmt} data: ${todos}`);

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row inserted: ${results.affectedRows}`);

      return 1;
    });
  } catch (error) {
    console.log(error);
  }
};

exports.Select = (sql, table, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      if (table == "MasterUser") {
        callback(null, model.MasterUser(results));
      }

      if (table == "MasterRole") {
        callback(null, model.MasterRole(results));
      }

      if (table == "MasterPosition") {
        callback(null, model.MasterPosition(results));
      }

      if (table == "MasterDepartment") {
        callback(null, model.MasterDepartment(results));
      }

      if (table == "MasterClient") {
        callback(null, model.MasterClient(results));
      }

      if (table == "MasterConcernType") {
        callback(null, model.MasterConcernType(results));
      }

      if (table == "MasterPersonel") {
        callback(null, model.MasterPersonel(results));
      }

      if (table == "MasterPriorityType") {
        callback(null, model.MasterPriorityType(results));
      }

      if (table == "MasterUrgencyType") {
        callback(null, model.MasterUrgencyType(results));
      }

      if (table == "MasterLocation") {
        callback(null, model.MasterLocation(results));
      }

      if (table == "MasterStatus") {
        callback(null, model.MasterStatus(results));
      }

      if (table == "MasterIssue") {
        callback(null, model.MasterIssue(results));
      }

      if (table == "MasterPriorityDue") {
        callback(null, model.MasterPriorityDue(results));
      }

      if (table == "RequestTicketDetail") {
        callback(null, model.RequestTicketDetail(results));
      }

      if (table == "MasterFilter") {
        callback(null, model.MasterFilter(results));
      }

      if (table == "TicketComment") {
        callback(null, model.TicketComment(results));
      }

      if (table == "TicketUpdate") {
        callback(null, model.TicketUpdate(results));
      }

      if (table == "AssignTicketDetail") {
        callback(null, model.AssignTicketDetail(results));
      }

      if (table == "ClientRequestTicketDetails") {
        callback(null, model.ClientRequestTicketDetails(results));
      }

      if (table == "RequestChildTicketDetail") {
        callback(null, model.RequestChildTicketDetail(results));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.StoredProcedure = (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.StoredProcedureResult = (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error.message, null);
      }
      callback(null, results[0]);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.Update = async (sql, callback) => {
  try {
    connection.query(sql, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      // console.log('Rows affected:', results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.UpdateMultiple = async (sql, data, callback) => {
  try {
    connection.query(sql, data, (error, results, fields) => {
      if (error) {
        callback(error, null);
      }
      // console.log('Rows affected:', results.affectedRows);

      callback(null, `Rows affected: ${results.affectedRows}`);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.CloseConnect = () => {
  connection.end();
};

exports.Insert = (stmt, todos, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    // console.log(`statement: ${stmt} data: ${todos}`);

    connection.query(stmt, [todos], (err, results, fields) => {
      if (err) {
        callback(err, null);
      }
      // callback(null, `Row inserted: ${results}`);
      callback(null, `Row inserted: ${results.affectedRows}`);
      // console.log(`Row inserted: ${results.affectedRows}`);
    });
  } catch (error) {
    callback(error, null);
  }
};

exports.SelectResult = (sql, callback) => {
  try {
    connection.connect((err) => {
      return err;
    });
    connection.query(sql, (error, results, fields) => {
      // console.log(results);

      if (error) {
        callback(error, null);
      }

      callback(null, results);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.InsertTable = (tablename, data, callback) => {
  if (tablename == "master_user") {
    let sql = `INSERT INTO master_user(
            mu_fullname,
            mu_username,
            mu_password,
            mu_role,
            mu_position,
            mu_status,
            mu_createdby,
            mu_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_role") {
    let sql = `INSERT INTO master_role(
            mr_rolename,
            mr_status,
            mr_createdby,
            mr_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_position") {
    let sql = `INSERT INTO master_position(
            mp_positionname,
            mp_status,
            mp_createdby,
            mp_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_department") {
    let sql = `INSERT INTO master_department(
            md_departmentname,
            md_status,
            md_createdby,
            md_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_client") {
    let sql = `INSERT INTO master_client(
            mc_fullname,
            mc_username,
            mc_password,
            mc_email,
            mc_contactnumber,
            mc_status,
            mc_createdby,
            mc_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_concern_type") {
    let sql = `INSERT INTO master_concern_type(
            mct_concernname,
            mct_status,
            mct_createdby,
            mct_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_personel") {
    let sql = `INSERT INTO master_personel(
            mp_fullname,
            mp_department,
            mp_role,
            mp_position,
            mp_location,
            mp_status,
            mp_createdby,
            mp_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_priority_type") {
    let sql = `INSERT INTO master_priority_type(
            mpt_priorityname,
            mpt_status,
            mpt_createdby,
            mpt_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_urgency_type") {
    let sql = `INSERT INTO master_urgency_type(
            mut_urgencyname,
            mut_status,
            mut_createdby,
            mut_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_location") {
    let sql = `INSERT INTO master_location(
            ml_locationname,
            ml_status,
            ml_createdby,
            ml_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_status") {
    let sql = `INSERT INTO master_status(
            ms_statusname,
            ms_status,
            ms_createdby,
            ms_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_issue") {
    let sql = `INSERT INTO master_issue(
            mi_issuename,
            mi_concernname,
            mi_status,
            mi_createdby,
            mi_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_priority_due") {
    let sql = `INSERT INTO master_priority_due(
            mpd_priorityname,
            mpd_day,
            mpd_hour,
            mpd_status,
            mpd_createdby,
            mpd_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "request_ticket_detail") {
    let sql = `INSERT INTO request_ticket_detail(
            td_ticketid,
            td_subject,
            td_concern,
            td_issue,
            td_requestername,
            td_requesteremail,
            td_description,
            td_priority,
            td_ticketstatus,
            td_datecreated,
            td_duedate,
            td_statusdetail,
            td_assignedto,
            td_department,
            td_attachement,
            td_comment) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "master_filter") {
    let sql = `INSERT INTO master_filter(
            mf_filtername,
            mf_isticketid,
            mf_issubject,
            mf_isconcern,
            mf_isissue,
            mf_isrequestername,
            mf_isrequesteremail,
            mf_isdescription,
            mf_ispriority,
            mf_isticketstatus,
            mf_isdatecreated,
            mf_isduedate,
            mf_isstatusdetail,
            mf_isassignto,
            mf_isdepartment,
            mf_isattachement,
            mf_iscomment,
            mf_status,
            mf_createdby,
            mf_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "ticket_comment") {
    let sql = `INSERT INTO ticket_comment(
            tc_ticketid,
            tc_comment,
            tc_attachement,
            tc_status,
            tc_commentby,
            tc_commentdate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "ticket_update") {
    let sql = `INSERT INTO ticket_update(
            tu_ticketid,
            tu_previousticketstatus,
            tu_currentticketstatus,
            tu_commentby,
            tu_commentdate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "assign_ticket_details") {
    let sql = `INSERT INTO assign_ticket_details(
            atd_assigndate,
            atd_assignto,
            atd_ticketid,
            atd_ticketstatus,
            atd_reportdate,
            atd_status,
            atd_assignby) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "client_request_ticket_details") {
    let sql = `INSERT INTO client_request_ticket_details(
                ctrd_requestid,
                ctrd_requestby,
                ctrd_requestdate,
                ctrd_concern,
                ctrd_issue,
                ctrd_description,
                ctrd_attachement,
                ctrd_status,
                ctrd_createddate) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }

  if (tablename == "request_child_ticket_detail") {
    let sql = `INSERT INTO request_child_ticket_detail(
              ctd_referenceid,
              ctd_ticketid,
              ctd_ticketstatus,
              ctd_datecreated,
              ctd_assignedto) VALUES ?`;

    this.Insert(sql, data, (err, result) => {
      if (err) {
        callback(err, null);
      }
      callback(null, result);
    });
  }
};

exports.isDataExist = (sql, tablename) => {
  return new Promise((resolve, reject) => {
    this.Select(sql, tablename, (err, result) => {
      if (err) reject(err);

      if (result.length != 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

exports.isSingleDataExist = (sql, tablename, callback) => {
  this.Select(sql, tablename, (err, result) => {
    if (err) callback(err, null);

    if (result.length != 0) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  });
};
