var express = require('express');

var fixtures = require('../app/scripts/fixtures');
var zutils = require('../app/scripts/zutils');

var router = express.Router();

var dao = require('../models/dao');
router.get('/', function (req, res) {
    dao.getAllUrlTitles().then(function (rings) {
        res.header("Content-Type", "text/xml");
        res.render('sitemap', {
            rings: rings,
        });
    })
});

module.exports = router;
