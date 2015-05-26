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
    self.tiffany = {
        name: 'Tiffany',
        id: 2
    };
    self.swarovski = {
        name: 'Swarovski',
        id: 3
    };

    self.companies = [
        self.michealHill,
        self.pascoes,
        self.tiffany,
        self.swarovski
    ];
    self.getCompanyByName = function (name) {
        for (var i = 0; i < self.companies.length; i++) {
            var company = self.companies[i];
            if (company.name.toLowerCase() === name.toLowerCase()) {
                return company;
            }
        }
    };
    self.getCompanyById = function (id) {
        for (var i = 0; i < self.companies.length; i++) {
            var company = self.companies[i];
            if (company.id === id) {
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
        'copper',

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
        'topaz'
    ];
    self.suggestions = [
        'white gold',
        'gold',
        'silver',
        'steel',
        'titanium',
        'platinum',
        'copper',

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
        'topaz'
    ];

    self.tagMap = {};
    for (var i = 0; i < self.tags.length; i++) {
        var tag = self.tags[i];
        self.tagMap[tag] = 1;
    }

    self.results_limit = 50;

    self.priceHistogram = [
        0,
        10,
        25,
        50,
        75,
        100,
        150,
        200,
        250,
        300,
        350,
        400,
        500,
        750,
        1000,
        1500,
        2000,
        3000,
        4000,
        5000,
        7500
    ];

    return self;
})();

if (typeof module == 'undefined') {
    module = {};
}
module.exports = fixtures;
