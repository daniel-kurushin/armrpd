(function() {

    'use strict';

    angular
        .module('rpdApp')
        .factory('Data', Data);

    function Data() {
        var vm = this;
        vm.SaveData = function (key, value) {
            sessionStorage.setItem(key, JSON.stringify(value));
        };
        vm.GetData = function (key) {
            return JSON.parse(sessionStorage.getItem(key));
        };
        vm.SaveVar = function (key, value) {
            sessionStorage.setItem(key, value);
        };
        vm.GetVar = function (key) {
            return sessionStorage.getItem(key);
        };
        vm.ClearVar = function (key, value) {
            sessionStorage.setItem(key, value);
        }
        vm.CLearAllData = function () {
            sessionStorage.clear();
        };
        vm.rpdData = {};
        vm.ids = {};
        vm.chair = {};
        return vm;
    }

})();
