var ringView = (function ($) {
    "use strict";
    var self = {};

    var $zoomedTarget = null;

    var oldLeft, oldTop, oldHeight, oldWidth;
    self.destroyRingView = function (evt) {
        if ($zoomedTarget) {
            $zoomedTarget.find('.hidden-detail').fadeOut();
            $zoomedTarget.removeClass('fullscreen-tile');
            $('#drawer').removeClass('offcanvas');
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
        $target.addClass('fullscreen-tile');
        $target.find('.gallery-image').addClass('img-fullscreen');
        var $currentZoomedTarget = $zoomedTarget;
        $('#drawer').addClass('offcanvas');

        setTimeout(function () {
            if ($currentZoomedTarget === $zoomedTarget) {
                $target.find('.hidden-detail').fadeIn();
            }
        }, 300);

        return false;
    };

    APP.Views['/ring/:ringname'] = {
        'construct': function construct(args) {
            self.ringName = args[0];
            var $target = $(document.getElementById('ring-' + self.ringName));
            initView($target)
        },
        'destroy': self.destroyRingView
    };
    return self;
})(jQuery);
