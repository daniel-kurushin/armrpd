(function() {

	'use strict';

	angular
		.module('rpdApp')
		.controller('MainController', MainController);

	function MainController(Data){
        var vm = this;
        vm.Init = function () {
            vm.chair = Data.chair;
            vm.chair = Data.GetData('chair');
            vm.rpdData = Data.rpdData;
            vm.rpdData = Data.GetData('rpdData')
        };
        vm.ClearVar = Data.ClearVar;
        vm.CLearAllData = Data.CLearAllData;
	}
})();
