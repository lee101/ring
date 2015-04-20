var utils = (function () {
    "use strict";
    var self = {};

    self.getSubStringBeforeFirst = function (str, first) {
        return str.substring(0, str.indexOf(first));
    };

    return self;
})();

module.exports = utils;
