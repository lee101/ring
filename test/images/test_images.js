var expect = require('chai').expect;

var lwip = require('lwip');
var image_utils = require('../../crawlers/image_utils');



var tiffanyRingLarge;
describe('setup', function () {

    it('sets up', function () {
        lwip.open('./test/images/tiffany-needs-cropping.jpeg', function (err, image) {
            tiffanyRingLarge = image;
        });
    })
});
describe('image', function () {

    it('#gets background color', function () {
        var color = image_utils.getBackgroundColor(tiffanyRingLarge)
        expect(title).to.equal({
            r: 0,
            g: 0,
            b: 0,
        })
    });
});


