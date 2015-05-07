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
        var $loadMore = $('.load-more');
        $loadMore.attr('disabled', 'disabled');
        $loadMore.html('<paper-spinner class="yellow" active="" role="progressbar" aria-label="loading"></paper-spinner>');

        $.ajax('/rings', {
            data: {},
            type: 'GET',
            success: function (data) {
                $loadMore.removeAttr('disabled');
                $loadMore.html('Load More');
                addToGallery(data);
            }
        })

    };


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

    var app = document.querySelector('#app');


    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    function initGallery() {
        $('#gallery-tiles').justifiedGallery({
            rowHeight: 300,
            margins: 2
        });
    }
    function addToGallery(results) {
        var domString = zutils.render('rings.jinja2', {
            thumbs: results
        });
        $('#gallery-tiles').append(domString);
        $('#gallery-tiles').justifiedGallery('norewind');
    }

    app.addEventListener('template-bound', function () {

        $('.load-more').click(self.nextPage);
        initGallery();
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
