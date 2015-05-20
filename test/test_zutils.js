var zutils = require('../app/scripts/zutils');
var expect = require('chai').expect;

describe('zutils', function () {

    it('getStringAfterLast', function () {
        var str = 'h5t28vsmc78e. asdf .png.jpg';
        var ext = zutils.getStringAfterLast(str, '.');
        expect(ext).to.equal('jpg');

        var ext = zutils.getStringAfterLast(str, 'H');
        expect(ext).to.equal('')
    });

    it('getFileExtension', function () {
        var str = 'h5t28vsmc78e. asdf .png.jpg';
        var ext = zutils.getFileExtension(str);
        expect(ext).to.equal('.jpg');

        var str = 'asdf';
        var ext = zutils.getFileExtension(str);
        expect(ext).to.equal('');

    })
});
