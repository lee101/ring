var cheerio = require('cheerio');


var crawlers = (function () {
    "use strict";
    var self = {};

    /*
     http://www.michaelhill.co.nz/jewellery/rings/diamond?start=1&format=page-element&sz=40&
     http://www.michaelhill.co.nz/jewellery/rings?start=1&format=page-element&sz=40&
     bump start by sz (size) to paginate
      */

    self.michealHill = function () {
        ;
    };
    self.getTitle = function (dom) {
        var title = dom('[property="og:title"]').attr('content');
        return title;
    };


    return self;
})();

module.exports = crawlers;
