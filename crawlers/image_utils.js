var lwip = require('lwip');
var convert = require("color-convert");
var DeltaE = require('delta-e');

image_utils = (function () {
    "use strict";
    var self = {};

    self.getBackgroundColor = function (image) {
        var r = 0;
        var g = 0;
        var b = 0;
        var totalNumPixels = 0;
        var borderAmount = 0.05;

        var borderWidth = Math.floor(borderAmount * image.width());
        var borderHeight = Math.floor(borderAmount * image.height());
        //top rectangle
        var xFrom = 0;
        var xTo = image.width();
        var yFrom = 0;
        var yTo = borderHeight;

        totalNumPixels = xTo * yTo; //num pixels = area of first rect
        //func gets the total rgb of a current rectangle
        var addTotalRGBOfRect = function () {
            for (var x = xFrom; x < xTo; x++) {
                for (var y = yFrom; y < yTo; y++) {
                    var color = image.getPixel(x, y);
                    r += color.r;
                    g += color.g;
                    b += color.b;
                }
            }
        };

        addTotalRGBOfRect();
        // bottom rectangle
        xFrom = 0;
        xTo = borderWidth;
        yFrom = image.height() - borderHeight;
        yTo = image.height();

        totalNumPixels += Math.abs((xTo - xFrom) * (yTo - yFrom)); //num pixels
        addTotalRGBOfRect();
        //left rect
        xFrom = 0;
        xTo = borderWidth;
        yFrom = borderHeight;
        yTo = image.height() - borderHeight;

        totalNumPixels += Math.abs((xTo - xFrom) * (yTo - yFrom)); //num pixels
        addTotalRGBOfRect();
        //right rect
        xFrom = image.width() - borderWidth;
        xTo = image.width();
        yFrom = borderHeight;
        yTo = image.height() - borderHeight;

        totalNumPixels += Math.abs((xTo - xFrom) * (yTo - yFrom)); //num pixels
        addTotalRGBOfRect();
        return {
            r: r / totalNumPixels,
            g: g / totalNumPixels,
            b: b / totalNumPixels
        }
    };
    self.deltaE = function (colorA, colorB) {
        var labA = convert.rgb2lab(colorA.r, colorA.g, colorA.b);
        var labB = convert.rgb2lab(colorB.r, colorB.g, colorB.b);

        return DeltaE.getDeltaE00({
            L: labA[0],
            A: labA[1],
            B: labA[2],
        }, {
            L: labB[0],
            A: labB[1],
            B: labB[2],
        })
    };

    self.isSameColor = function (colorA, colorB) {
        return self.deltaE(colorA, colorB) <= 4
    };

    self.cropImage = function (image, callback) {
        var backgroundColor = self.getBackgroundColor(image);
        var minX = Infinity;
        var minY = Infinity;
        var maxX = 0;
        var maxY = 0;

        for (var x = 0; x < image.width(); x++) {
            for (var y = 0; y < image.height(); y++) {
                var color = image.getPixel(x, y);
                if (self.isSameColor(backgroundColor, color)) {
                    continue;
                }
                minX = Math.min(minX, x);
                minY = Math.min(minY, y);
                maxX = Math.max(maxX, x);
                maxY = Math.max(maxY, y);
            }
        }
        //square up, add padding, ensure crop is inside the image
        var width = maxX - minX;
        var height = maxY - minY;
        var extraSpace = Math.abs(width - height);
        if (width > height) {
            minY -= extraSpace/2;
            maxY += extraSpace/2;
        }
        else if (height > width) {
            minX -= extraSpace/2;
            maxX += extraSpace/2;
        }
        //add padding

        width = maxX - minX;
        height = maxY - minY;

        minY -= height * 0.05;
        maxY += height * 0.05;
        minX -= width * 0.05;
        maxX += width * 0.05;

        minY = Math.floor(minY);
        maxY = Math.floor(maxY);
        minX = Math.floor(minX);
        maxX = Math.floor(maxX);

        minY = Math.max(minY, 0);
        maxY = Math.min(maxY, image.height());
        minX = Math.max(minX, 0);
        maxX = Math.min(maxX, image.width());

        image.crop(minX, minY, maxX, maxY, function (err, image) {
            callback(image);
        })
    };

    self.processFile = function (fileName) {
        lwip.open(fileName, function (err, image) {
            self.cropImage(image, function (image) {
                image.writeFile(fileName, function (err) {
                    if (err) {
                        console.log(err)
                    }
                })
            })
        });
    }

    return self;
})();

module.exports = image_utils;
