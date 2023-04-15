var express = require('express');
var router = express.Router();

function isAuthAdmin(req, res, next) {

  if (req.session.isAuth && req.session.accounttype == "CREATOR") {
    next();
  }
  else {
    res.redirect('/login');
  }
};

/* GET home page. */
router.get('/', isAuthAdmin,  function (req, res, next) {
  res.render('index', {
    title: 'Ticketing System',
    users: 'CREATOR',
    // password: req.session.passowrd,
    // fullname: req.session.fullname,
    // accounttype: req.session.accounttype
  });
});

module.exports = router;