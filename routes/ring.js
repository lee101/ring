var express = require('express');

var fixtures = require('../app/scripts/fixtures');
var zutils = require('../app/scripts/zutils');

var router = express.Router();

var dao = require('../models/dao');
router.get('/:name', function (req, res) {
    dao.getRingsFromRequest(req).then(function (rings) {
        var ring;
        if (rings.urltitle) {
            ring = rings;
            rings = [ring]
        }
        res.render('index', {
            ring: ring,
            thumbs: rings,
            fixtures: fixtures,
            zutils: zutils
        });
    })
});

module.exports = router;
