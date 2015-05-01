APP = (function (document) {
    'use strict';
    var self = {};

    self.searchChanged = function () {
        var searchData = {};
        if (self.minPrice !== 0) {
            searchData.minPrice = self.minPrice;
        }
        if (self.maxPrice !== priceHistogram[priceHistogram.length - 1]) {
            searchData.maxPrice = self.maxPrice;
        }
    };

    self.nextPage = function (evt) {
        $('.load-more').addClass('disabled');

        $('.load-more').val('disabled');

    }


    var app = document.querySelector('#app');

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('template-bound', function () {

        $('.load-more').click(self.nextPage);

        $('#gallery-tiles').justifiedGallery({
            rowHeight: 300,
            lastRow: 'nojustify',
            margins: 2
        });

        var priceHistogram = [
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
        self.minPrice = 0;
        self.maxPrice = priceHistogram[priceHistogram.length - 1];

        $('#price-range').nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "value_changed_callback": function (cause, leftValue, rightValue) {
                self.minPrice = priceHistogram[leftValue];
                self.maxPrice = priceHistogram[rightValue];

                $(this).parent().find('.leftLabel').attr('label', zutils.numberToCurrency(self.minPrice));
                var rightText = zutils.numberToCurrency(self.maxPrice);
                if (self.maxPrice == priceHistogram[priceHistogram.length - 1]) {
                    rightText += '+'
                }

                $(this).parent().find('.rightLabel').attr('label', rightText);

                $.debounce(self.searchChanged, 250);
            }
        }).on('touchstart mousedown', function () {
            return false;
        });

    });


    return self;
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
