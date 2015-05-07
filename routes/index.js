var express = require('express');
var router = express.Router();
/* GET home page. */

var dao = require('../models/dao');
router.get('/', function(req, res) {
    dao.getRingsFromRequest(req).then(function (rings) {
        res.render('index', {thumbs: rings});
    })
});

module.exports = router;
