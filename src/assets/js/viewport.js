/* global document */
var viewport = (function (doc) {
    'use strict';

    var self          = this,
        timer         = 0,
        body          = doc.body,
        og_body_class = body.className;

    return {
        // fire method on window resize once the resize event completes
        startTimer: function () {
            if (typeof(addEventListener) === 'function') {
                window.addEventListener('resize', function () {
                    clearTimeout(self.timer);
                    self.timer = setTimeout(self.respond, 100);
                }, false);
            }
        },

        respond: function () {
            body.className = og_body_class + ' ' + self.getType();

            if (self.getType() === 'tablet' || self.getType() === 'widescreen') {
                // do stuff if viewport is handheld
            }
        },

        getType: function () {
            var size, tablet, desktop, viewport_type;

            if (typeof getComputedStyle === 'function') {
                size = window.getComputedStyle(document.body, ':after').getPropertyValue('content');

                if (size.indexOf('tablet') !== -1) {
                    viewport_type = 'tablet';
                } else if (size.indexOf('widescreen') !== -1) {
                    viewport_type = 'widescreen';
                } else {
                    viewport_type = 'handheld';
                }
            } else {
                viewport_type = 'widescreen';
            }

            return viewport_type;
        }
    };
}(document));