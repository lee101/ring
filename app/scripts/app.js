(function (document) {
    'use strict';

    var app = document.querySelector('#app');

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('template-bound', function () {

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
            10000
        ];
        $('#price-range').nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "value_changed_callback": function (cause, leftValue, rightValue) {
                $(this).parent().find('.leftLabel').attr('label', '$ ' + priceHistogram[leftValue]);
                var rightText = priceHistogram[rightValue];
                if (rightValue == $('#price-range').data('range_max')) {
                    rightText += '+'
                }

                $(this).parent().find('.rightLabel').attr('label', '$ ' + rightText);
            }
        });
    });



// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
