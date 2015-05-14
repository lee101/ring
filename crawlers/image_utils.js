var lwip = require('lwip');

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
    }

    self.cropImage = function (image) {
        ;
    }

    return self;
})();

module.exports = image_utils;
