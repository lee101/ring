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
        var color = image_utils.getBackgroundColor(tiffanyRingLarge)
        expect(color).to.deep.equal({
            r: 255,
            g: 255,
            b: 255
        })
    });
});


