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
        ;
    };

    self.cropImage = function (image) {
        var backgroundColor = self.getBackgroundColor(image);
        for (var x = 0; x < image.width(); x++) {
            for (var y = 0; y < image.height(); y++) {
                var color = image.getPixel(x, y);

                ;
            }
        }
    };

    return self;
})();

module.exports = image_utils;
