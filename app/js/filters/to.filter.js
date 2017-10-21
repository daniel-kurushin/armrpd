(function () {
    'use strict';

    angular
        .module('rpdApp')
        .filter('toUpper',toUpper);

    function toUpper() {
        return function(text) {
            if(text !== null) {
                return text.toUpperCase();
            }
        }
    }
})();
