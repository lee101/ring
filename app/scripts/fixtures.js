var fixtures = (function () {
    "use strict";
    var self = {};
    self.michealHill = {
        name: 'Micheal Hill',
        id: 0
    };
    self.pascoes = {
        name: 'Pascoes',
        id: 1
    };

    self.companies = [
        self.michealHill,
        self.pascoes
    ];
    self.getCompanyByName = function (name) {
        for (var i = 0; i < self.companies.length; i++) {
            var company = self.companies[i];
            if (company.name.toLowerCase() === name.toLowerCase()) {
                return company;
            }
        }
    };
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
