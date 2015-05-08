var fixtures = (function () {
    "use strict";
    var self = {};
    self.michealHill = {
        name: 'Micheal Hill',
        id: 0
    };
    self.pascoes = {
        name: 'Micheal Hill',
        id: 0
    };

    self.companies = [
        self.michealHill,
        self.pascoes
    ];
    self.tags = [
        'ring',
        'gold',
        'silver',
        'steel',
        'titanium',
        'platinum',

        'aquamarine',
        'amethyst',
        'citrine',
        'sapphire',
        'crystal',
        'zirconia',
        'diamond',
        'emerald',
        'garnet',
        'pearl',
        'peridot',
        'quartz',
        'ruby',
        'sapphire',
        'topaz'
    ];
    self.tagMap = {};
    for (var i = 0; i < self.tags.length; i++) {
        var tag = self.tags[i];
        self.tagMap[tag] = 1;
    }

    self.results_limit = 5;
    return self;
})();

if (typeof module == 'undefined') {
    module = {};
}
module.exports = fixtures;
