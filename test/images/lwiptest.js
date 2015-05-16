var lwip = require('lwip');
var request = require('request');


//lwip.open('./test/images/tiffany-needs-cropping.jpeg', function (err, image) {
//    image.crop(100, 100, 200, 200, function (err, image) {
//        image.writeFile('test/images/test.jpeg', function (err) {
//            ;
//        })
//    })
//});
request('http://www.swarovski.com/is-bin/intershop.static/WFS/SCO-Media-Site/-/-/publicimages/CG/B2C/PROD/BestView/5033029/TileGroup0/0-0-0.jpg', function (error, response, body) {
    lwip.open(new Buffer(body), 'jpg', function (err, image) {
        image.crop(100, 100, 200, 200, function (err, image) {
            image.writeFile('test/images/swarskovtest.jpeg', function (err) {
                ;
            })
        })
    });
})
