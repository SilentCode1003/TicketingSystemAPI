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
}
