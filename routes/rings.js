var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    var ring = {
        urltitle: 'asdf-asdf',
        title: 'asdf asdf',
        price: '$ 20',
        image: '/mstile-310x310.png',
        description: 'some description',
        tags: ['ring', 'gold', 'diamond'],
        url: 'http://asdfasdfasdf.originalsite'
    };
    var rings = [ring, ring, ring];


    res.json(rings);
});

module.exports = router;
