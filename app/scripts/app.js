(function (document) {
    'use strict';

    var app = document.querySelector('#app');

    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    app.addEventListener('template-bound', function () {
        //console.log('Our app is ready to rock!');
        $('#gallery-tiles').justifiedGallery({
            rowHeight: 300,
            lastRow: 'nojustify',
            margins: 2
        });
        $('#price-range').nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "value_changed_callback": function (cause, leftValue, rightValue) {
                $(this).parent().find('.leftLabel').attr('label', '$ ' + leftValue);
                if (rightValue == $('#price-range').data('range_max')) {
                    rightValue += '+'
                }
                $(this).parent().find('.rightLabel').attr('label', '$ ' + rightValue);
            }
        });
    });



// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
