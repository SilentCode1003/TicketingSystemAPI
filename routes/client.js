var express = require('express');
var router = express.Router();

function isAuthAdmin(req, res, next) {

  if (req.session.isAuth && req.session.role == "ADMINISTRATOR" && req.session.position == "DEVELOPER") {
    next();
  }
  else {
    res.redirect('/login');
  }
};

/* GET home page. */
router.get('/', isAuthAdmin,  function (req, res, next) {
  res.render('client', {
    title: req.session.title,
    username: req.session.username,
    fullname: req.session.fullname,
    role: req.session.role,
    position: req.session.position
  });
});

module.exports = router;