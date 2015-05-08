var cheerio = require('cheerio');
var request = require('request');
var dao = require('../models/dao');
var fixtures = require('../app/scripts/fixtures');


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
        var start = 1;
        var step = 40;

        mHillSelf.getPages = function () {
            request('http://www.michaelhill.co.nz/jewellery/rings?start=' + start + '&format=page-element&sz=40&', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = mHillSelf.getPageUrls($content);
                    mHillSelf.parsePageUrls(pageUrls);
                    if (pageUrls.length == step) {
                        start += step;
                        mHillSelf.getPages();
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
                image: self.getImage($page),
                company_id: fixtures.michealHill.id,
                price: self.getPrice($page('.product-add-to-cart .product-price').text())

            };
            return dao.createRing(ring);
        };
        mHillSelf.getPageUrls = function ($page) {
            var pageUrls = [];
            $page('li').each(function (i, obj) {
                pageUrls.push($page(obj).find('.thumb-link').attr('href'));
            });
            return pageUrls;
        };
        return mHillSelf;
    })();


    self.pascoes = (function () {
        var paSelf = {};
        var start = 1;
        var step = 40;

        paSelf.getPages = function () {
            request('http://www.pascoes.co.nz/category/rings?i=8&page=' + page, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = paSelf.getPageUrls($content);
                    paSelf.parsePageUrls(pageUrls);
                    if (pageUrls.length == step) {
                        start += step;
                        paSelf.getPages();
                    }
                } else {
                    return console.log(error);
                }
            })
        };

        paSelf.parsePageUrls = function (pageUrls) {
            for (var i = 0; i < pageUrls.length; i++) {
                var url = pageUrls[i];
                request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var $content = cheerio.load(body);
                        paSelf.parseDetailPage($content)
                    } else {
                        return console.log(error);
                    }
                })
            }
        };
        paSelf.parseDetailPage = function ($page) {
            var ring = {
                title: self.getTitle($page),
                description: self.getDescription($page),
                image: self.getImage($page)
            };
            return dao.createRing(ring);
        };
        paSelf.getPageUrls = function ($page) {
            var pageUrls = [];
            $page('.product-cat-holder').each(function (i, obj) {
                pageUrls.push($page(obj).find('a').attr('href'));
            });
            return pageUrls;
        };
        return paSelf;
    })();

    self.getTitle = function ($dom) {
        var title = $dom('[property="og:title"]').attr('content');
        return title;
    };
    self.getDescription = function ($dom) {
        var ogDescription = $dom('[property="og:description"]').attr('content');
        return ogDescription;
    };
    self.getImage = function ($dom) {
        var ogImage = $dom('[property="og:image"]').attr('content');
        return ogImage;
    };
    self.getPrice = function (text) {
        var words = text.trim()
            .replace(/\$/g, '')
            .replace(/\s*,\s*/g, '')
            .split(/\s\s*/).reverse();
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (+word) {
                return +word;
            }
        }
    };


    return self;
})();

module.exports = crawlers;
