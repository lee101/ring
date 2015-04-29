var express = require('express');
var dao = require('../models/dao');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var ring = dao.getRing();
    var rings = [ring, ring, ring];


    res.json(rings);
});

module.exports = router;
