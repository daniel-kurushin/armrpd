(function() {

  'use strict';

  angular
      .module('rpdApp')
      .service('AuthService', AuthService);

    function AuthService($q, $http) {

      this.login = function(user) {
        var deferred = $q.defer();
        $http.post('/auth/login', {username: user.username, password: user.password})
        .then(function(res) {
          if(res.status == 200 && res.data.status) {
            localStorage.setItem('currentToken', res.data.token);
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }, function() {
          deferred.reject();
        });
        return deferred.promise;
      };

      this.getProfile = function() {
        const token = localStorage.getItem('currentToken');
        return $http.get('/auth/user', {headers: {'Authorization': 'Bearer ' + token}});
      };

      this.ensureAuthenticated = function() {
        var deferred = $q.defer();
        const token = localStorage.getItem('currentToken');
        $http.get('/auth/status', {headers: {'Authorization': 'Bearer ' + token}})
        .then(function(res) {
          if(res.status == 200 && res.data.status) {
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }, function() {
          deferred.reject();
        });
        return deferred.promise;
      };

      // this.logout = function() {
      //   return UserProfile.then(function (userProfile) {
      //     userProfile.$clear();
      //   });
      //   localStorage.removeItem('currentToken');
      // };
    }

})();
