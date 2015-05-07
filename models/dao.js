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
    self.getRingsFromRequest = function (req) {
        var queryObj = {
            where: {}
        };
        var minPrice = +req.query.minPrice;
        if (minPrice) {
            queryObj.where.price = queryObj.where.price || {};
            queryObj.where.price.$gte = minPrice
        }
        var maxPrice = +req.query.maxPrice;
        if (maxPrice) {
            queryObj.where.price = queryObj.where.price || {};
            queryObj.where.price.$lte = maxPrice
        }
        var offset = +req.query.offset || 0;
        if (offset) {
            queryObj.offset = offset;
        }

        return dao.getRings(queryObj)
    };

    self.getRings = function (config) {
        if (typeof config === 'undefined') {
            config = {}
        }
        config.limit = fixtures.results_limit;
        config.offset = config.offset || 0;
        var rings = Ring.findAll(config);
        return rings;
    };

    self.createRing = function (config) {
        config.urltitle = zutils.urlencode(config.title);
        if (config.price >= 29) {
            var priceStr = '' + config.price;
            if (priceStr[priceStr.length - 1] == '9') {
                config.price += 1;
            }
        }


        var savedRing = Ring.create(config).get({plain: true});

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
    title: Sequelize.TEXT,
    urltitle: Sequelize.TEXT,
    company_id: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    image: Sequelize.TEXT,
    description: Sequelize.TEXT,
    url: Sequelize.TEXT
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
