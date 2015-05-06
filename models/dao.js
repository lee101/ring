var zutils = require('../app/scripts/zutils');
var fixtures = require('../app/scripts/fixtures');

var dao = (function () {
    var self = {};

    self.getRing = function () {
        return {
            urltitle: 'asdf-asdf',
            title: 'asdf asdf',
            price: '$ 20',
            image: '/mstile-310x310.png',
            description: 'some description',
            tags: ['ring', 'gold', 'diamond'],
            url: 'http://asdfasdfasdf.originalsite'
        };
    };
    self.getRings = function () {
        var ring = self.getRing();
        var rings = [ring, ring, ring];
        return rings;
    };

    self.createRing = function (config) {
        config.urltitle = zutils.urlencode(config.title);
        var words = (config.title+' '+config.description).toLowerCase().split(/\s\s*/);
        var keywords = [];
        for (var wordIdx = 0; wordIdx < words.length; wordIdx++) {
            var word = words[wordIdx];
            if (fixtures.tagMap[word] === 1) {
                keywords.push(word)
            }
        }

        var savedRing = Ring.create(config).get({plain:true})

        for (var i = 0; i < words.length; i++) {
            var obj = words[i];

        }
        return savedRing;

    };

    return self;
})();

var Sequelize = require('sequelize');
var sequelize = new Sequelize('ring', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

var Ring = sequelize.define('ring', {
    title: Sequelize.STRING,
    urltitle: Sequelize.STRING,
    company_id: Sequelize.INTEGER,
    price: Sequelize.STRING,
    image: Sequelize.STRING,
    description: Sequelize.STRING,
    url: Sequelize.STRING
});

var RingTag = sequelize.define('ring_tag', {
    name: Sequelize.STRING
});

RingTag.hasOne(Ring);

sequelize.sync().then(function () {
    return Ring.create({
        urltitle: 'asdf-asdf',
        title: 'asdf asdf',
        price: '$ 20',
        image: '/mstile-310x310.png',
        description: 'some description',
        url: 'http://asdfasdfasdf.originalsite'
    });
}).then(function (jane) {
    console.log(jane.get({
        plain: true
    }))
});

module.exports = dao;
