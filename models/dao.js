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
    }

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
