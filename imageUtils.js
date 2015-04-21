var imageUtils = (function ($) {
    "use strict";
    var self = {};
    var lwip = require('lwip');
    lwip.open('app/images/ring-gem-icon512-rotated.png', function (err, image) {
        // check 'err'. use 'image'.

        // image.resize(...), etc.
    });

    return self;
})(jQuery);
