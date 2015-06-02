var ringView = (function ($) {
    "use strict";
    var self = {};

    var $zoomedTarget = null;

    var oldLeft, oldTop, oldHeight, oldWidth;
    self.destroyRingView = function (evt) {
        if ($zoomedTarget) {
            $zoomedTarget.find('.hidden-detail').fadeOut();
            $zoomedTarget.css({
                'z-index': 0,
                'height': oldHeight,
                'width': oldWidth,
                'left': oldLeft,
                'top': oldTop,
                'position': 'absolute'
            });
            $zoomedTarget.find('.gallery-image').removeClass('img-fullscreen');

            setTimeout(function () {
                $zoomedTarget = null;
            }, 100)
        }
    };
    var initView = function ($currentTarget) {
        var $target = $currentTarget;
        if ($target === $zoomedTarget) {
            return true;
        }
        if ($zoomedTarget) {
            return true;
        }
        $zoomedTarget = $currentTarget;

        oldTop = parseInt($target.css('top'));
        oldLeft = parseInt($target.css('left'));
        oldHeight = $target.height();
        oldWidth = $target.width();
        $target.css({
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            position: 'fixed',
            'z-index': 99999
        });
        $target.find('.gallery-image').addClass('img-fullscreen');
        var $currentZoomedTarget = $zoomedTarget;
        setTimeout(function () {
            if ($currentZoomedTarget === $zoomedTarget) {
                $target.find('.hidden-detail').fadeIn();
            }
        }, 300);

        return false;
    };

    APP.Views['/ring/:ringname'] = function construct(args) {
        self.ringName = args[0];
        var $target = $('#gallery-tiles').find('ring-' + self.ringName)
        initView($target)
    };
    return self;
})(jQuery);
