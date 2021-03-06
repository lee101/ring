var fs = require('fs');
var expect = require('chai').expect;
var cheerio = require('cheerio');


var crawlers = require('../../crawlers/crawlers');
var dao = require('../../models/dao');


var mHillDetailRingSilver;
var mHillRingGalleryPage;
describe('setup', function () {

    it('sets up', function (done) {

        fs.readFile('./test/crawlers/micheal-hill-detail-ring-silver.html', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            mHillDetailRingSilver = cheerio.load(data);
            fs.readFile('./test/crawlers/micheal-hill-ring-gallery-page.html', 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                mHillRingGalleryPage = cheerio.load(data);
                done()
            });
        });

    })
});

describe('crawlers', function () {

    it('#getTitle(dom) should use og:title', function () {
        var title = crawlers.getTitle(mHillDetailRingSilver);
        expect(title).to.equal('Ring with Enhanced Black Diamonds in Sterling Silver')
    });

    it('#getDescription(dom) should use og:description', function () {
        var title = crawlers.getDescription(mHillDetailRingSilver);
        expect(title).to.equal('Showcase your flair for fashion with this sterling silver snake ring. Created to look like a snake coiled around your finger, the scale patterned body and  enhanced black diamond details bring this piece to life.')
    });
    it('#getImage(dom) should use og:image', function () {
        var title = crawlers.getImage('http://base.url', mHillDetailRingSilver);
        expect(title).to.equal('http://demandware.edgesuite.net/aanc_prd/on/demandware.static/Sites-MichaelHillNZ-Site/Sites-MHJ_Master/en_NZ/v1430441345851/hi-res/12322275_1.jpg')
    });
    it('#getPrice(dom)', function () {
        var price = crawlers.getPrice(' asdf asdf $45,500 asdf  \n special $5 easdf');
        expect(price).to.equal(5)
    });
    describe('micheal hill', function () {

        it('#getPageUrls(dom) should use og:image', function () {
            var pageUrls = crawlers.getPageUrls('http://base.url', mHillRingGalleryPage, 'li', '.thumb-link');
            expect(pageUrls.length).to.equal(12)
        });
        it('#parseDetailPage(dom) should create a ring', function () {
            crawlers.michealHill.parseDetailPage('http://page.url/place', mHillDetailRingSilver);
            var ringsTitle = 'Ring with Enhanced Black Diamonds in Sterling Silver';
            dao.getRingByTitle(ringsTitle).then(function (databaseRing) {
                expect(databaseRing.title).to.equal(ringsTitle)
            })
        })
    });
});


