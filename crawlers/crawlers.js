var cheerio = require('cheerio');
var request = require('request');
var url = require('url');

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
        var baseUrl = 'http://www.michaelhill.co.nz';

        mHillSelf.getPages = function () {
            request(baseUrl + '/jewellery/rings?start=' + start + '&format=page-element&sz=40&', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = self.getPageUrls(baseUrl, $content, 'li', '.thumb-link');
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

        mHillSelf.parseDetailPage = function (pageUrl, $page) {
            var ring = {
                title: self.getTitle($page),
                description: self.getDescription($page),
                image: self.getImage(baseUrl, $page),
                url: pageUrl,
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
        var baseUrl = 'http://www.pascoes.co.nz';

        paSelf.getPages = function () {
            request(baseUrl + '/category/rings?i=8&page=' + page, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = self.getPageUrls(baseUrl, $content, '.product-cat-holder', 'a');
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


        paSelf.parseDetailPage = function (pageUrl, $page) {
            var ring = {
                title: $page('.product-text h1').text(),
                description: $page('.product-blurb').text() || $page('.note').text(),
                image: url.resolve(baseUrl, $page('.product-image img').attr('src')),
                url: pageUrl,
                company_id: fixtures.pascoes.id,
                price: self.getFirstPrice($page('.add-price').text())
            };
            return dao.createRing(ring);
        };

        return paSelf;
    })();


    self.swarovski = (function () {
        var paSelf = {};
        var page = 1;
        var baseUrl = 'http://www.swarovski.com/Web_US/en/0112/category/Jewelry/Rings.html?PageSize=36&CurrentPageView=&SelectedMenuItem=CategoryPage&SortBy=';

        paSelf.getPages = function () {
            request(baseUrl + '/category/rings?i=8&page=' + page, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = self.getPageUrls(baseUrl, $content, '.product-cat-holder', 'a');
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


        paSelf.parseDetailPage = function (pageUrl, $page) {
            var ring = {
                title: self.getTitle($page),
                description: self.getDescription($page),
                // NOTE weird image stitching going on
                image: url.resolve(baseUrl, $page('.product-image img').attr('src')),
                url: pageUrl,
                company_id: fixtures.swarovski.id,
                price: self.getFirstPrice($page('.add-price').text())
            };
            return dao.createRing(ring);
        };

        return paSelf;
    })();


    self.tiffany = (function () {
        var tfSelf = {};
        var baseUrl = 'http://www.tiffany.com';

        tfSelf.getPages = function () {
            request({
                url: baseUrl + '/Shopping/CategoryBrowse.aspx?cid=287466',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'
                }
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var $content = cheerio.load(body);
                    var pageUrls = self.getPageUrls(baseUrl, $content, 'noscript li', 'a');
                    self.parsePageUrls(pageUrls, tfSelf.parseDetailPage);
                } else {
                    console.log(error);
                    console.log('error returned from ' + this.href);
                    return console.log(response);
                }
            })
        };


        tfSelf.parseDetailPage = function (pageUrl, $page) {
            try {
                var ring = {
                    title: $page('title').text(),
                    description: $page('meta[name="description"]').attr('content'),
                    image: self.getImage(baseUrl, $page),
                    url: pageUrl,
                    company_id: fixtures.tiffany.id,
                    price: self.getFirstPrice($page('#divItemTotalAndButton').text())
                };
                return dao.createRing(ring);
            } catch(e) {
                console.log('error parsing detail page at url:' + pageUrl);
                console.log(e)
            }

        };

        return tfSelf;
    })();

    self.getTitle = function ($dom) {
        var ogTitle = $dom('[property="og:title"]').attr('content');
        var title = $dom('title').text();
        return ogTitle || title;
    };
    self.getDescription = function ($dom) {
        var ogDescription = $dom('[property="og:description"]').attr('content');
        var metaDescription = $dom('meta[name="description"]').attr('content');
        return ogDescription || metaDescription;
    };
    self.getImage = function (baseUrl, $dom) {
        var ogImage = url.resolve(baseUrl, $dom('[property="og:image"]').attr('content'));
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
        function processUrl(i) {
            var url = pageUrls[i];
            setTimeout(function () {
                request({
                    url: url,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36'
                    }
                }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var $content = cheerio.load(body);
                        callback(url, $content)
                    } else {
                        return console.log(error);
                    }
                })
            }, 100 * i);
        }

        for (var i = 0; i < pageUrls.length; i++) {
            processUrl(i)
        }
    };

    self.getPageUrls = function (baseUrl, $page, selector, find) {
        var pageUrls = [];
        $page(selector).each(function (i, obj) {
            pageUrls.push(url.resolve(baseUrl, $page(obj).find(find).attr('href')));
        });
        return pageUrls;
    };


    return self;
})();

module.exports = crawlers;
