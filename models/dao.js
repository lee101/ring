var request = require('request');
var fs = require('fs');

var zutils = require('../app/scripts/zutils');
var fixtures = require('../app/scripts/fixtures');

var dao = (function () {
    var self = {};

    self.getRingByTitle = function (title) {
        return self.getRing(zutils.urlencode(title))
    };
    self.getRing = function (urltitle) {
        return Ring.find({
            where: {
                urltitle: urltitle
            }
        });
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
        var companyName = req.query.company;
        if (companyName) {
            var company = fixtures.getCompanyByName(companyName);
            queryObj.where.company_id = company.id
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
        config.title = config.title.trim();
        config.description = config.description.trim();
        config.urltitle = zutils.urlencode(config.title);
        if (config.price >= 29) {
            var priceStr = '' + config.price;
            if (priceStr[priceStr.length - 1] == '9') {
                config.price += 1;
            }
        }
        var companyName = zutils.urlencode(fixtures.getCompanyById(config.company_id).name);
        request({
            url: config.url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                zutils.getFileExtensionForContentType(response.headers['content-type'])

            } else {
                console.log(error);
                console.log('error returned from ' + this.href);
                return console.log(response);
            }
        }).pipe(fs.createWriteStream('images/' + companyName + '/' +
            config.urltitle + zutils.getFileExtension(config.url)));


        var savedRing = Ring.create(config).get({plain: true});

        return savedRing;

    };

    return self;
})();

var Sequelize = require('sequelize');
var RDS_HOSTNAME = process.env.RDS_HOSTNAME;
var RDS_DB_NAME = process.env.RDS_DB_NAME;
var RDS_USERNAME = process.env.RDS_USERNAME;
var RDS_PASSWORD = process.env.RDS_PASSWORD;
var RDS_PORT = process.env.RDS_PORT;

var CI = process.env.CI;
if (RDS_HOSTNAME) {
    var sequelize = new Sequelize(RDS_DB_NAME, RDS_USERNAME, RDS_PASSWORD, {
        host: RDS_HOSTNAME,
        post: RDS_PORT,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}
else if (CI) {
    var sequelize = new Sequelize('circle_ci', null, null, {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}
else {
    var sequelize = new Sequelize('ring', 'postgres', 'postgres', {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    });
}

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
