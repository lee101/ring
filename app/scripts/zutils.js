var zutils = (function () {
    "use strict";
    var self = {};

    self.getSubStringBeforeFirst = function (str, first) {
        return str.substring(0, str.indexOf(first));
    };
    self.currencyToNumber = function (str) {
        return parseFloat(str.replace(/^\D+/, '').replace(/,/g, ''));
    };

    self.numberToCurrency = function (num) {
        if (!(num instanceof Number)) {
            num = Number(num);
        }
        return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/^/g, "$ ");
    };

    self.urlencode = function (name) {
        return name.replace(/\s/g, '-')
            .replace(/[\.\t\,\:;\(\)'@!\\\?#/<>&]/g, '')
            .replace(/[^\x00-\x7F]/g, "")
            .toLowerCase();
    };

    self.uid = (function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return function () {
            return s4() + s4();
        };
    })();

    self.render = function (template, opts) {
//TODO on load?
        if (typeof opts === 'undefined') {
            opts = {};
        }
        $.extend(opts, {
            url: window.location.href,
            urlencode: encodeURIComponent,
            window: window,
            client_side: true
        });
        return nunjucks.render(template, opts);
    };

    return self;
})();

nunjucks.configure({autoescape: true});

if (typeof module == 'undefined') {
    module = {};
}
module.exports = zutils;
