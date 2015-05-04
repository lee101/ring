var fs = require('fs');
var expect = require('chai').expect;
var cheerio = require('cheerio');


var crawlers = require('../../crawlers/crawlers');

var mHillDetailRingSilver;
describe('setup', function () {

    it('sets up', function (done) {
        fs.readFile('./test/crawlers/micheall-hill-detail-ring-silver.html', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            mHillDetailRingSilver = cheerio.load(data);
            done();
        });
    })
});

describe('crawlers', function () {

    describe('#getTitle(dom)', function () {

        it('should use og:title', function () {
            var title = crawlers.getTitle(mHillDetailRingSilver);
            expect(title).to.equal('Ring with Enhanced Black Diamonds in Sterling Silver')
        })
    })
});
