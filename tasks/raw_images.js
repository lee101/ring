var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpPlugins = require('gulp-load-plugins')();

var request = require('request');
var lwip = require('lwip');
var fs = require('fs');

var dao = require('../models/dao');
var image_utils = require('../crawlers/image_utils');
var zutils = require('../app/scripts/zutils');
var fixtures = require('../app/scripts/fixtures');

function GetRingImage(ring) {
    request.head({
        url: ring.image,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'
        }
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var extension = zutils.getFileExtensionForContentType(response.headers['content-type']);
            var companyName = zutils.urlencode(fixtures.getCompanyById(ring.company_id).name);
            var fileName = 'images/raw/' + companyName + '/' +
                ring.urltitle + extension;
            request.get({
                url: ring.image,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'
                }
            }).pipe(fs.createWriteStream(fileName));
        } else {
            console.log(error);
            console.log('error returned from ' + this.href);
            return console.log(response);
        }
    })
}

gulp.task('fetch:rawimages', function () {
    dao.getAllRings().then(function (rings) {
        for (var ringIdx = 0; ringIdx < rings.length; ringIdx++) {
            var ring = rings[ringIdx];
            GetRingImage(ring)
        }
    })

});

gulp.task('parseimages', function () {
    gulp.src('images/raw/**/*.{png,jpg,jpeg}')
        .pipe(gulpPlugins.tap(function (file) {
            //TODO
            var extension = zutils.getFileExtension(file.relative);
            lwip.open('images/raw/' + file.relative, function (err, image) {
                if (err) {
                    console.log(err);
                    console.log('Err for image at: images/raw/' + file.relative);
                    return;
                }

                image_utils.cropImage(image, function (image) {
                    image.writeFile('images/processed/' + file.relative, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                })
            });
            //file.contents = file.contents;
        }));

});
