var express = require('express');
var router = express.Router();
/* GET home page. */

var dao = require('../models/dao');
router.get('/', function(req, res) {

  res.render('index', { thumbs: dao.getRings() });
});

module.exports = router;
