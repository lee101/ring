var expect = require('chai').expect;

var lwip = require('lwip');
var image_utils = require('../../crawlers/image_utils');


var tiffanyRingLarge;
describe('setup', function () {

    it('sets up', function (done) {
        lwip.open('./test/images/tiffany-needs-cropping.jpeg', function (err, image) {
            tiffanyRingLarge = image;
            done()
        });
    })
});
describe('image', function () {

    it('#gets background color', function () {
        var color = image_utils.getBackgroundColor(tiffanyRingLarge);
        expect(color).to.deep.equal({
            r: 255,
            g: 255,
            b: 255
        })
    });
    it('#gets deltaE', function () {
        var black = {
            r: 0,
            g: 0,
            b: 0
        };
        var blackVSwhite = image_utils.deltaE(black,
            {
                r: 255,
                g: 255,
                b: 255
            });
        var blackVSred = image_utils.deltaE(black,
            {
                r: 255,
                g: 0,
                b: 0
            });
        expect(blackVSwhite).to.be.above(blackVSred)
    });
    it('crops', function () {
        this.timeout(50000);
        image_utils.cropImage(tiffanyRingLarge, function (image) {
            image.
            writeFile('./test/images/tiffany-done-cropping.jpeg', function (err) {
                // check err...
                // done.
            });
        })
    });

});


