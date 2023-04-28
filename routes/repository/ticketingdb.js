const mysql = require('mysql');
const model = require('../model/ticketingmodel');
require('dotenv').config();
const crypt = require('./cryptography');

let password = '';
crypt.Decrypter(process.env._PASSWORD, (err, result) => {
    if (err) throw err;

    password = result;
    console.log(`${result}`);
});


const connection = mysql.createConnection({
    host: process.env._HOST,
    user: process.env._USER,
    password: password,
    database: process.env._DATABASE
});

crypt.Encrypter('#Ebedaf9dd0d!', (err, result) => {
    if (err) console.error('Error: ', err);

    console.log(result);
})

exports.CheckConnection = () => {
    connection.connect((err) => {
        if (err) {
            console.error('Error connection to MYSQL databases: ', err);
            return;
        }
        console.log('MySQL database connection established successfully!');
    });
}

exports.InsertMultiple = async (stmt, todos) => {
    try {
        connection.connect((err) => { return err; })
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
}

exports.Select = (sql, table, callback) => {
    try {
        connection.connect((err) => { return err; })
        connection.query(sql, (error, results, fields) => {

            // console.log(results);

            if (error) {
                callback(error, null)
            }

            if (table == 'MasterUser') {
                callback(null, model.MasterUser(results));
            }

            if (table == 'MasterRole') {
                callback(null, model.MasterRole(results));
            }

            if (table == 'MasterPosition') {
                callback(null, model.MasterPosition(results));
            }

            if (table == 'MasterDepartment') {
                callback(null, model.MasterDepartment(results));
            }

            if (table == 'MasterClient') {
                callback(null, model.MasterClient(results));
            }

            if (table == 'MasterConcernType') {
                callback(null, model.MasterConcernType(results));
            }

            if (table == 'MasterPersonel') {
                callback(null, model.MasterPersonel(results));
            }

            if (table == 'MasterPriorityType') {
                callback(null, model.MasterPriorityType(results));
            }

            if (table == 'MasterUrgencyType') {
                callback(null, model.MasterUrgencyType(results));
            }

            if (table == 'MasterLocation') {
                callback(null, model.MasterLocation(results));
            }

            if (table == 'MasterStatus') {
                callback(null, model.MasterStatus(results));
            }

            if (table == 'MasterIssue') {
                callback(null, model.MasterIssue(results));
            }

            if (table == 'MasterPriorityDue') {
                callback(null, model.MasterPriorityDue(results));
            }

            if (table == 'RequestTicketDetail') {
                callback(null, model.RequestTicketDetail(results));
            }

            if (table == 'MasterFilter') {
                callback(null, model.MasterFilter(results));
            }
        });

    } catch (error) {
        console.log(error);
    }
}

exports.StoredProcedure = (sql, data, callback) => {
    try {

        connection.query(sql, data, (error, results, fields) => {
            if (error) {
                callback(error.message, null);
            }
            callback(null, results[0])
        });
    } catch (error) {
        callback(error, null);
    }
}

exports.StoredProcedureResult = (sql, callback) => {
    try {

        connection.query(sql, (error, results, fields) => {
            if (error) {
                callback(error.message, null);
            }
            callback(null, results[0])
        });
    } catch (error) {
        callback(error, null);
    }
}

exports.Update = async (sql, callback) => {
    try {
        connection.query(sql, (error, results, fields) => {
            if (error) {
                callback(error, null)
            }
            // console.log('Rows affected:', results.affectedRows);

            callback(null, `Rows affected: ${results.affectedRows}`);
        });
    } catch (error) {
        callback(error, null)
    }
}

exports.UpdateMultiple = async (sql, data, callback) => {
    try {
        connection.query(sql, data, (error, results, fields) => {
            if (error) {
                callback(error, null)
            }
            // console.log('Rows affected:', results.affectedRows);

            callback(null, `Rows affected: ${results.affectedRows}`);
        });
    } catch (error) {
        console.log(error);
    }
}

exports.CloseConnect = () => {
    connection.end();
}

exports.Insert = (stmt, todos, callback) => {
    try {
        connection.connect((err) => { return err; })
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
}

exports.SelectResult = (sql, callback) => {
    try {
        connection.connect((err) => { return err; })
        connection.query(sql, (error, results, fields) => {

            // console.log(results);

            if (error) {
                callback(error, null)
            }

            callback(null, results);

        });

    } catch (error) {
        console.log(error);
    }
}

exports.InsertTable = (tablename, data, callback) => {
    if (tablename == 'master_user') {
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
            callback(null, result)
        })
    }

    if (tablename == 'master_role') {
        let sql = `INSERT INTO master_role(
            mr_rolename,
            mr_status,
            mr_createdby,
            mr_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_position') {
        let sql = `INSERT INTO master_position(
            mp_positionname,
            mp_status,
            mp_createdby,
            mp_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_department') {
        let sql = `INSERT INTO master_department(
            md_departmentname,
            md_status,
            md_createdby,
            md_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_client') {
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
            callback(null, result)
        })
    }

    if (tablename == 'master_concern_type') {
        let sql = `INSERT INTO master_concern_type(
            mct_concernname,
            mct_status,
            mct_createdby,
            mct_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_personel') {
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
            callback(null, result)
        })
    }

    if (tablename == 'master_priority_type') {
        let sql = `INSERT INTO master_priority_type(
            mpt_priorityname,
            mpt_status,
            mpt_createdby,
            mpt_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_urgency_type') {
        let sql = `INSERT INTO master_urgency_type(
            mut_urgencyname,
            mut_status,
            mut_createdby,
            mut_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_location') {
        let sql = `INSERT INTO master_location(
            ml_locationname,
            ml_status,
            ml_createdby,
            ml_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_status') {
        let sql = `INSERT INTO master_status(
            ms_statusname,
            ms_status,
            ms_createdby,
            ms_createddate) VALUES ?`;

        this.Insert(sql, data, (err, result) => {
            if (err) {
                callback(err, null);
            }
            callback(null, result)
        })
    }

    if (tablename == 'master_issue') {
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
            callback(null, result)
        })
    }

    if (tablename == 'master_priority_due') {
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
            callback(null, result)
        })
    }

    if (tablename == 'request_ticket_detail') {
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
            callback(null, result)
        })
    }

    if (tablename == 'master_filter') {
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
            callback(null, result)
        })
    }
}
