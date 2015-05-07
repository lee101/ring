var zutils = require('../app/scripts/zutils');
var fixtures = require('../app/scripts/fixtures');

var dao = (function () {
    var self = {};

    self.getRing = function (urltitle) {
        return {
            urltitle: 'asdf-asdf',
            title: 'asdf asdf',
            price: 20,
            image: '/mstile-310x310.png',
            description: 'some description',
            tags: ['ring', 'gold', 'diamond'],
            url: 'http://asdfasdfasdf.originalsite'
        };
    };
    self.getRings = function (config) {

        var rings = Ring.findAll({
            limit: 50,
            offset: config.offest || 0
        })
        return rings;
    };

    self.createRing = function (config) {
        config.urltitle = zutils.urlencode(config.title);


        var savedRing = Ring.create(config).get({plain: true})

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
    price: Sequelize.INTEGER,
    image: Sequelize.STRING,
    description: Sequelize.STRING,
    url: Sequelize.STRING
}, {
    getterMethods: {
        tags: function () {
            var words = (this.title + ' ' + this.description)
                .toLowerCase().split(/\s\s*/);
            var tags = [];
            for (var wordIdx = 0; wordIdx < words.length; wordIdx++) {
                var word = words[wordIdx];
                if (fixtures.tagMap[word] === 1) {
                    tags.push(word)
                }
            }
            return tags
        }
    },
});

sequelize.sync();

module.exports = dao;
