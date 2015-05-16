var lwip = require('lwip');

var tiffanyRingLarge;

lwip.open('./test/images/tiffany-needs-cropping.jpeg', function (err, image) {
    image.crop(100, 100, 200, 200, function (err, image) {
        image.writeFile('test/images/test.jpeg', function (err) {
            ;
        })
    })

});
