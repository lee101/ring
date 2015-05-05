var cheerio = require('cheerio');
var request = require('request');


var crawlers = (function () {
    "use strict";
    var self = {};

    /*
     http://www.michaelhill.co.nz/jewellery/rings/diamond?start=1&format=page-element&sz=40&
     http://www.michaelhill.co.nz/jewellery/rings?start=1&format=page-element&sz=40&
     bump start by sz (size) to paginate
      */

    self.michealHill = (function () {
        var mHillSelf = {};
        var pagesProductsCount = 0;
        var start = 1;
        var step = 40;

        mHillSelf.getPages = function (){
            request('http://www.michaelhill.co.nz/jewellery/rings?start='+start+'&format=page-element&sz=40&', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = mHillSelf.getPageUrls(body);
                    mHillSelf.parsePageUrls(body);
                    if (pageUrls.length == step) {
                        start += step;
                        getPages();
                    }
                } else {
                    return console.log(error);
                }
            })
        };

        mHillSelf.parsePageUrls = function (pageUrls) {
            for (var i = 0; i < pageUrls.length; i++) {
                var url = pageUrls[i];
                request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var $content = cheerio.load(body);
                        mHillSelf.parseDetailPage($content)
                    } else {
                        return console.log(error);
                    }
                })
            }
        };
        mHillSelf.parseDetailPage = function ($page) {
            var ring = {
                title: self.getTitle($page),

                description: self.getDescription($page),
                title: self.getTitle($page),

            };
            dao.createRing(ring);
        }
        mHillSelf.getPageUrls = function ($page) {
            var pageUrls = [];
            $page('li').each(function (i, obj) {
                pageUrls.push($page(obj).find('.thumb-link').attr('href'));
            });
            return pageUrls;
        };
        return mHillSelf;
    })();

    self.getTitle = function (dom) {
        var title = dom('[property="og:title"]').attr('content');
        return title;
    };
    self.getDescription = function (dom) {
        var ogDescription = dom('[property="og:description"]').attr('content');
        return ogDescription;
    };
    self.getImage = function (dom) {
        var ogImage = dom('[property="og:image"]').attr('content');
        return ogImage;
    };


    return self;
})();

module.exports = crawlers;
