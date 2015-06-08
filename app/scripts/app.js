(function (document) {
    'use strict';
    var self = APP || {};
    self.offset = 0;
    var companiesMenu = null;


    self.searchChanged = function (extraData) {
        if (typeof extraData == 'undefined') {
            extraData = {};
        }
        var $loadMore = $('.load-more');
        if (!viewState.changeData(extraData)) {
            if (extraData.company && extraData.company != 'all') {
                setTimeout(function () {
                    companiesMenu.select(null);
                }, 100);
                viewState.changeData({
                    company: 'all'
                })
            }
            else {
                return;
            }
        }
        var searchData = viewState.getData();

        $('#main-spinner').attr('active', '');
        self.offset = 0;
        var errorFunc = function (data) {
            $loadMore.attr('disabled', 'disabled');
            $loadMore.html('No results');
        };
        $.ajax('/rings', {
            data: searchData,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $loadMore.removeAttr('disabled');
                    $loadMore.html('Load More');
                    refreshGallery(data);
                }
                else {
                    errorFunc(data)
                }
            },
            error: errorFunc
        });
    };


    self.nextPage = function (evt) {
        var $loadMore = $('.load-more');
        $loadMore.attr('disabled', 'disabled');
        $loadMore.html('<paper-spinner class="yellow" active="" role="progressbar" aria-label="loading"></paper-spinner>');
        self.offset += fixtures.results_limit;
        var searchData = viewState.getData();
        searchData.offset = self.offset;

        var errorFunc = function (data) {
            $loadMore.html('No more results');
        };
        $.ajax('/rings', {
            data: searchData,
            type: 'GET',
            success: function (data) {
                if (data) {
                    $loadMore.removeAttr('disabled');
                    $loadMore.html('Load More');
                    addToGallery(data);
                }
                else {
                    errorFunc(data)
                }
            },
            error: errorFunc
        })
    };


    // Listen for template bound event to know when bindings
    // have resolved and content has been stamped to the page
    function initGallery(done) {
        var $gallery = $('#gallery-tiles');
        $gallery.justifiedGallery({
            rowHeight: 300,
            margins: 2
        });
        var firstTime = true;
        $gallery.on('jg.complete', function () {
            if (firstTime) {
                done();
            }
            firstTime = false;
        })
    }

    function addToGallery(results) {
        var domString = zutils.render('rings.jinja2', {
            thumbs: results
        });
        $('#gallery-tiles').append(domString);
        $('#gallery-tiles').justifiedGallery('norewind');
        $('#main-spinner').removeAttr('active');
    }

    function refreshGallery(results) {
        var domString = zutils.render('rings.jinja2', {
            thumbs: results
        });
        $('#gallery-tiles').html(domString);
        $('#gallery-tiles').justifiedGallery();
        $('#main-spinner').removeAttr('active');
    }

    var app = document.querySelector('#app');
    app.addEventListener('dom-change', function () {
        companiesMenu = document.querySelector('#companies-menu');
        //Object.observe()
        var oldHandler = companiesMenu._selectedChanged
        companiesMenu._selectedChanged = function () {
            oldHandler();
            var selected = companiesMenu.selected;
            if (!selected) {
                return self.searchChanged({
                    company: 'all'
                })
            }
            self.searchChanged({
                company: selected.name
            })
        };

        search.init();

        self.sliderChange = $.debounce(200, self.searchChanged);
        var firstCall = true;

        $('.load-more').click(self.nextPage);
        initGallery(function done() {
            APP.constructRouter();
        });
        $('#price-range').nstSlider({
            "left_grip_selector": ".leftGrip",
            "right_grip_selector": ".rightGrip",
            "value_bar_selector": ".bar",
            "value_changed_callback": function (cause, leftValue, rightValue) {
                var minPrice = fixtures.priceHistogram[leftValue];
                var maxPrice = fixtures.priceHistogram[rightValue];

                $(this).parent().find('.leftLabel').attr('label', zutils.numberToCurrency(minPrice));
                var rightText = zutils.numberToCurrency(maxPrice);
                if (maxPrice == fixtures.priceHistogram[fixtures.priceHistogram.length - 1]) {
                    rightText += '+'
                }

                $(this).parent().find('.rightLabel').attr('label', rightText);
                if (!firstCall) {
                    self.sliderChange({
                        minPrice: minPrice,
                        maxPrice: maxPrice
                    });
                }
                else {
                    firstCall = false;
                }
            }
        }).on('touchstart mousedown', function () {
            return false;
        });

    });

    self.thumbFallback = function (img, url) {
        if (img.src != '/images/ring512-rotated.png' && img.src != url) {
            img.src = url;
            $('#gallery-tiles').justifiedGallery('norewind');
        }
        else if (img.src != '/images/ring512-rotated.png') {
            img.src = '/images/ring512-rotated.png';
            $('#gallery-tiles').justifiedGallery('norewind');
        }
    };

    return self;
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
