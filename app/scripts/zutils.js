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
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace(/^/g, "$");
    };

    return self;
})();

module = module || {};
module.exports = zutils;
