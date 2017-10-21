(function() {

	'use strict';

  angular
			.module('rpdApp')
			.controller('LoginController', LoginController);

	function LoginController($state) {
		console.log('Login Controller');
		const vm = this;
		vm.user = {};

		vm.onLogin = function() {
			AuthService.login(vm.user)
			.then(function() {
				return UserProfile.$refresh();
			})
			.then(function(res) {
				console.log(res);
				$state.go('main');
			})
	    .catch(function() {
				Materialize.toast('Логин или пароль не верен! Повторите ввод.', 3000);
	    });
		};

		vm.onCancel = function() {
			$state.go('home');
		};
	};
})();
