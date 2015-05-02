var fixtures = (function () {
    "use strict";
    var self = {};

    self.companies = [
        {
            name: 'Micheal Hill'
        },
        {
            name: 'Pascoes'
        }
    ];
    return self;
})();

if (typeof module == 'undefined') {
    module = {};
}
module.exports = zutils;
