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
    });
  });

  return dataResult;
};

exports.MasterRole = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      rolecode: key.mr_rolecode,
      rolename: key.mr_rolename,
      status: key.mr_status,
      createdby: key.mr_createdby,
      createddate: key.mr_createddate,
    });
  });

  return dataResult;
};

exports.MasterPosition = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      positioncode: key.mp_positioncode,
      positionname: key.mp_positionname,
      status: key.mp_status,
      createdby: key.mp_createdby,
      createddate: key.mp_createddate,
    });
  });

  return dataResult;
};

exports.MasterDepartment = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      departmentcode: key.md_departmentcode,
      departmentname: key.md_departmentname,
      status: key.md_status,
      createdby: key.md_createdby,
      createddate: key.md_createddate,
    });
  });

  return dataResult;
};

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
    });
  });

  return dataResult;
};

exports.MasterConcernType = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      concerncode: key.mct_concerncode,
      concernname: key.mct_concernname,
      status: key.mct_status,
      createdby: key.mct_createdby,
      createddate: key.mct_createddate,
    });
  });

  return dataResult;
};

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
    });
  });

  return dataResult;
};

exports.MasterPriorityType = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      prioritycode: key.mpt_prioritycode,
      priorityname: key.mpt_priorityname,
      status: key.mpt_status,
      createdby: key.mpt_createdby,
      createddate: key.mpt_createddate,
    });
  });

  return dataResult;
};

exports.MasterUrgencyType = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      urgencycode: key.mut_urgencycode,
      urgencyname: key.mut_urgencyname,
      status: key.mut_status,
      createdby: key.mut_createdby,
      createddate: key.mut_createddate,
    });
  });

  return dataResult;
};

exports.MasterLocation = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      locationcode: key.ml_locationcode,
      locationname: key.ml_locationname,
      status: key.ml_status,
      createdby: key.ml_createdby,
      createddate: key.ml_createddate,
    });
  });

  return dataResult;
};

exports.MasterStatus = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      statuscode: key.ms_statuscode,
      statusname: key.ms_statusname,
      status: key.ms_status,
      createdby: key.ms_createdby,
      createddate: key.ms_createddate,
    });
  });

  return dataResult;
};

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
    });
  });

  return dataResult;
};

exports.MasterPriorityDue = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      priorityduecode: key.mpd_priorityduecode,
      priorityname: key.mpd_priorityname,
      day: key.mpd_day,
      hour: key.mpd_hour,
      status: key.mpd_status,
      createdby: key.mpd_createdby,
      createddate: key.mpd_createddate,
    });
  });

  return dataResult;
};

exports.RequestTicketDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      ticketid: key.td_ticketid,
      subject: key.td_subject,
      concern: key.td_concern,
      issue: key.td_issue,
      requestername: key.td_requestername,
      requesteremail: key.td_requesteremail,
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
    });
  });

  return dataResult;
};

exports.MasterFilter = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      filtercode: key.mf_filtercode,
      filtername: key.mf_filtername,
      isticketid: key.mf_isticketid,
      issubject: key.mf_issubject,
      isconcern: key.mf_isconcern,
      isissue: key.mf_isissue,
      isrequestername: key.mf_isrequestername,
      isrequesteremail: key.mf_isrequesteremail,
      isdescription: key.mf_isdescription,
      ispriority: key.mf_ispriority,
      isticketstatus: key.mf_isticketstatus,
      isdatecreated: key.mf_isdatecreated,
      isduedate: key.mf_isduedate,
      isstatusdetail: key.mf_isstatusdetail,
      isassignto: key.mf_isassignto,
      isdepartment: key.mf_isdepartment,
      isattachement: key.mf_isattachement,
      iscomment: key.mf_iscomment,
      status: key.mf_status,
      createdby: key.mf_createdby,
      createddate: key.mf_createddate,
    });
  });

  return dataResult;
};

exports.TicketComment = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      commentid: key.tc_commentid,
      ticketid: key.tc_ticketid,
      comment: key.tc_comment,
      attachement: key.tc_attachement,
      status: key.tc_status,
      commentby: key.tc_commentby,
      commentdate: key.tc_commentdate,
    });
  });

  return dataResult;
};

exports.TicketUpdate = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      ticketupdateid: key.tu_ticketupdateid,
      ticketid: key.tu_ticketid,
      previousticketstatus: key.tu_previousticketstatus,
      currentticketstatus: key.tu_currentticketstatus,
      commentby: key.tu_commentby,
      ommentdate: key.tu_commentdate,
    });
  });

  return dataResult;
};

exports.AssignTicketDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      detailid: key.atd_detailid,
      assigndate: key.atd_assigndate,
      assignto: key.atd_assignto,
      ticketid: key.atd_ticketid,
      ticketstatus: key.atd_ticketstatus,
      reportdate: key.atd_reportdate,
      status: key.atd_status,
      assignby: key.atd_assignby,
    });
  });

  return dataResult;
};

exports.ClientRequestTicketDetails = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      requestid: key.ctrd_requestid,
      requestby: key.ctrd_requestby,
      requestdate: key.ctrd_requestdate,
      concern: key.ctrd_concern,
      issue: key.ctrd_issue,
      description: key.ctrd_description,
      attachement: key.ctrd_attachement,
      status: key.ctrd_status,
      createddate: key.ctrd_createddate,
    });
  });

  return dataResult;
};

exports.RequestChildTicketDetail = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      referenceid: key.ctd_referenceid,
      ticketid: key.ctd_ticketid,
      ticketstatus: key.ctd_ticketstatus,
      datecreated: key.ctd_datecreated,
      assignedto: key.ctd_assignedto,
    });
  });

  return dataResult;
};

exports.KnowledgeBase = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      postid: key.kb_postid,
      title: key.kb_title,
      category: key.kb_category,
      content: key.kb_content,
      attachment: key.kb_attachment,
      status: key.kb_status,
      postby: key.kb_postby,
      postdate: key.kb_postdate,
    });
  });

  return dataResult;
};

exports.MasterCategory = (data) => {
  let dataResult = [];

  data.forEach((key, item) => {
    dataResult.push({
      categorycode: key.mc_categorycode,
      categoryname: key.mc_categoryname,
      status: key.mc_status,
      createdby: key.mc_createdby,
      createddate: key.mc_createddate,
    });
  });

  return dataResult;
};
