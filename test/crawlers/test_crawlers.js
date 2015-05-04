var fs = require('fs');

fs.readFile('./test/crawlers/micheall-hill-detail-ring-silver.html', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    //console.log(data);
});
describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            [1, 2, 3].indexOf(5).should.equal(-1);
            [1, 2, 3].indexOf(0).should.equal(-1);
        })
    })
})
