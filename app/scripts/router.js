(function () {
    "use strict";
    if (typeof APP == 'undefined') {
        APP = {}
    }
    APP.Routers = APP.Routers || {};
    APP.Collections = APP.Collections || {};
    APP.Models = APP.Models || {};
    APP.Views = APP.Views || {};

    APP.goto = function (name) {
        APP.router.navigate(name, {trigger: true});
        return false
    };

    APP.stepBack = function () {
        var currrentPath = window.location.hash;
        if (currrentPath == "") {
            currrentPath = window.location.pathname;
        }
        if (currrentPath.length <= 1) {
            APP.goto('/');
        }
        else {
            currrentPath = currrentPath.split('/');
            currrentPath.pop();
            currrentPath = currrentPath.join('/');
            APP.goto(currrentPath);
        }
        return false
    };


    $(document).on('click', 'a:not([data-bypass])', function (e) {
        var href = $(this).prop('href');
        var root = location.protocol + '//' + location.host + '/';
        if (root === href.slice(0, root.length)) {
            e.preventDefault();
            APP.goto(href.slice(root.length));
        }
    });

    APP.currentView = location.pathname;
    function defaultHandler(pathname) {
        return function () {
            if (APP.currentView == pathname && prerenderedPages[APP.currentView]) {
                return;
            }
            var currentView = APP.Views[APP.currentView];
            if (currentView) {
                currentView.destroy();
            }

            APP.currentView = pathname;
            APP.Views[pathname].construct(arguments);
        }
    }

    var prerenderedPages = {
        "/": "home"
    };
    var routes = {};
    $.each(prerenderedPages, function (key, value) {
        routes[key.substring(1)] = value;
    });
    jQuery.extend(routes, {
        //pages needing js rendering
        'ring/:ringname': 'ring'
    });

    var Router = Backbone.Router.extend({
        // Define routes
        'routes': routes,
        'home': defaultHandler('/'),
        'ring': defaultHandler('/ring/:ringname')
    });


    APP.constructRouter = function () {
        APP.router = new Router();
        APP.Views['/'] = {
            'destroy': $.noop,
            'construct': $.noop
        };
        Backbone.history.start({
            pushState: true
//            silent: true
        });
    };
}());
