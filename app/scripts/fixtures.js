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
    self.tags = [
        'ring',
        'gold',
        'silver',
        'diamond',
        'topaz',
        'aquamarine',
        'ruby',
    ]
    return self;
})();

if (typeof module == 'undefined') {
    module = {};
}
module.exports = zutils;
