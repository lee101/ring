(function (document) {
  'use strict';

  var app = document.querySelector('#app');

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    //console.log('Our app is ready to rock!');
  });
    $('#gallery-tiles').justifiedGallery()

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
