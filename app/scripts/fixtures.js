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
        'ruby'
    ]
    self.tagMap = {};
    for (var i = 0; i < self.tags.length; i++) {
        var tag = self.tags[i];
        self.tagMap[tag] = 1;
    }
    return self;
})();

if (typeof module == 'undefined') {
    module = {};
}
module.exports = fixtures;
