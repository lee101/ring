var express = require('express');
var dao = require('../models/dao');

var router = express.Router();

router.get('/', function(req, res) {
    dao.getRingsFromRequest(req).then(function (rings) {
        res.json(rings);
    })
});

module.exports = router;
