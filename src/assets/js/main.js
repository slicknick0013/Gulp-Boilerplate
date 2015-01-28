/* global console, window, document */

var main = (function (global, doc) {
    'use strict';

    var self = this;
    console.log(self);

    return {
        react: function (action, func) {
            var behavior = action || 'click',
                fun      = func || function () {};
            if (typeof addEventListener === 'function') {
                doc.body.addEventListener(behavior, fun, false);
            }
        },

        externalLinks: function (e) {
            if (e.target.rel === 'external') {
                e.preventDefault();
                open(e.target.href);
                return false;
            }

            return;
        }
    };
}(window, document));

main.react('click', main.externalLinks);