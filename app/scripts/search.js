var search = (function () {
    "use strict";
    var self = {};

    var substringMatcher = function (strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function (i, str) {
                if (substrRegex.test(str)) {
                    matches.push([str, str.indexOf(q)]);
                }
            });
            matches.sort(function (a, b) {
                return a[1] - b[1];
            });
            for (var i = 0; i < matches.length; i++) {
                matches[i] = matches[i][0];
            }

            cb(matches);
        };
    };
    self.init = function () {
        $('#searchbar').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'tags',
                source: substringMatcher(fixtures.suggestions)
            });
        if ($(window).height() > 700) {
            $('#searchbar').focus();
            setTimeout(function () {
                $('#searchbar').select()
            }, 100);
        }

    };


    return self;
})();
