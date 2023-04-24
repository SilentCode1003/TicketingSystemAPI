exports.MasterUser = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            userid: key.mu_userid,
            fullname: key.mu_fullname,
            username: key.mu_username,
            password: key.mu_password,
            role: key.mu_role,
            position: key.mu_position,
            status: key.mu_status,
            createdby: key.mu_createdby,
            createddate: key.mu_createddate,
        })
    });

    return dataResult;
}

exports.MasterRole = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            rolecode: key.mr_rolecode,
            rolename: key.mr_rolename,
            status: key.mr_status,
            createdby: key.mr_createdby,
            createddate: key.mr_createddate,
        })
    });

    return dataResult;
}

exports.MasterPosition = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            positioncode: key.mp_positioncode,
            positionname: key.mp_positionname,
            status: key.mp_status,
            createdby: key.mp_createdby,
            createddate: key.mp_createddate,
        })
    });

    return dataResult;
}

exports.MasterDepartment = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            departmentcode: key.md_departmentcode,
            departmentname: key.md_departmentname,
            status: key.md_status,
            createdby: key.md_createdby,
            createddate: key.md_createddate,
        })
    });

    return dataResult;
}

exports.MasterClient = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            clientid: key.mc_clientid,
            fullname: key.mc_fullname,
            username: key.mc_username,
            password: key.mc_password,
            email: key.mc_email,
            contactnumber: key.mc_contactnumber,
            status: key.mc_status,
            createdby: key.mc_createdby,
            createddate: key.mc_createddate,
        })
    });

    return dataResult;
}

exports.MasterConcernType = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            concerncode: key.mct_concerncode,
            concernname: key.mct_concernname,
            status: key.mct_status,
            createdby: key.mct_createdby,
            createddate: key.mct_createddate,
        })
    });

    return dataResult;
}

exports.MasterPersonel = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            personelid: key.mp_personelid,
            fullname: key.mp_fullname,
            department: key.mp_department,
            role: key.mp_role,
            position: key.mp_position,
            location: key.mp_location,
            status: key.mp_status,
            createdby: key.mp_createdby,
            createddate: key.mp_createddate,
        })
    });

    return dataResult;
}

exports.MasterPriorityType = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            prioritycode: key.mpt_prioritycode,
            priorityname: key.mpt_priorityname,
            status: key.mpt_status,
            createdby: key.mpt_createdby,
            createddate: key.mpt_createddate,
        })
    });

    return dataResult;
}

exports.MasterUrgencyType = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            urgencycode: key.mut_urgencycode,
            urgencyname: key.mut_urgencyname,
            status: key.mut_status,
            createdby: key.mut_createdby,
            createddate: key.mut_createddate,
        })
    });

    return dataResult;
}

exports.MasterLocation = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            locationcode: key.ml_locationcode,
            locationname: key.ml_locationname,
            status: key.ml_status,
            createdby: key.ml_createdby,
            createddate: key.ml_createddate,
        })
    });

    return dataResult;
}

exports.MasterStatus = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            statuscode: key.ms_statuscode,
            statusname: key.ms_statusname,
            status: key.ms_status,
            createdby: key.ms_createdby,
            createddate: key.ms_createddate,
        })
    });

    return dataResult;
}

exports.MasterIssue = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            issuecode: key.mi_issuecode,
            issuename: key.mi_issuename,
            concernname: key.mi_concernname,
            status: key.mi_status,
            createdby: key.mi_createdby,
            createddate: key.mi_createddate,
        })
    });

    return dataResult;
}

exports.RequestTicketDetail = (data) => {
    let dataResult = [];

    data.forEach((key, item) => {

        dataResult.push({
            ticketid: key.td_ticketid,
            subject: key.td_subject,
            concern: key.td_concern,
            issue: key.td_issue,
            requestername: key.td_requestername,
            requesteremail: key.key.td_requesteremail,
            description: key.td_description,
            priority: key.td_priority,
            ticketstatus: key.td_ticketstatus,
            datecreated: key.td_datecreated,
            duedate: key.td_duedate,
            statusdetail: key.td_statusdetail,
            assignedto: key.td_assignedto,
            department: key.td_department,
            attachement: key.td_attachement,
            comment: key.td_comment,
        })
    });

    return dataResult;
}