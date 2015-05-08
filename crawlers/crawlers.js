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
                    var pageUrls = self.getPageUrls($content, 'li', '.thumb-link');
                    self.parsePageUrls(pageUrls, mHillSelf.parseDetailPage);
                    if (pageUrls.length == step) {
                        start += step;
                        mHillSelf.getPages();
                    }
                } else {
                    return console.log(error);
                }
            })
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
        return mHillSelf;
    })();


    self.pascoes = (function () {
        var paSelf = {};
        var page = 1;

        paSelf.getPages = function () {
            request('http://www.pascoes.co.nz/category/rings?i=8&page=' + page, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = self.getPageUrls($content, '.product-cat-holder', 'a');
                    self.parsePageUrls(pageUrls, paSelf.parseDetailPage);
                    if (pageUrls.length >= 1) {
                        page += 1;
                        paSelf.getPages();
                    }
                } else {
                    return console.log(error);
                }
            })
        };


        paSelf.parseDetailPage = function ($page) {
            var ring = {
                title: self.getTitle($page),
                description: self.getDescription($page),
                image: self.getImage($page),
                company_id: fixtures.pascoes.id,
                price: self.getFirstPrice($page('.add-price').text())
            };
            return dao.createRing(ring);
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
    self.getFirstPrice = function (text) {
        var words = text.trim()
            .replace(/\$/g, '')
            .replace(/\s*,\s*/g, '')
            .split(/\s\s*/);
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            if (+word) {
                return +word;
            }
        }
    };

    self.parsePageUrls = function (pageUrls, callback) {
        for (var i = 0; i < pageUrls.length; i++) {
            var url = pageUrls[i];
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    callback($content)
                } else {
                    return console.log(error);
                }
            })
        }
    };

    self.getPageUrls = function ($page, selector, find) {
        var pageUrls = [];
        $page(selector).each(function (i, obj) {
            pageUrls.push($page(obj).find(find).attr('href'));
        });
        return pageUrls;
    };


    return self;
})();

module.exports = crawlers;
