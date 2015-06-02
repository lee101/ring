(function () {
    "use strict";
    window.APP = window.APP || {Routers: {}, Collections: {}, Models: {}, Views: {}};

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
            var args = arguments;
            if (APP.currentView == pathname && prerenderedPages[APP.currentView]) {
                return;
            }

            APP.Views[APP.currentView].destroy();

            APP.currentView = pathname;
            APP.Views[pathname]({args: args});
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


    $(document).ready(function () {
        APP.router = new Router();
        APP.Views['/'] = $.noop;
        Backbone.history.start({
            pushState: true
//            silent: true
        });
    });
}());
