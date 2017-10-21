(function() {

  'use strict';

  angular
      .module('rpdApp')
      .factory('UserProfile', UserProfile);

  function UserProfile(AuthService) {

    var userProfile = {};

    var clearUserProfile = function () {
      for (var prop in userProfile) {
        if (userProfile.hasOwnProperty(prop)) {
          delete userProfile[prop];
        }
      }
    };

    var fetchUserProfile = function () {
      return AuthService.getProfile().then(function (response) {
        clearUserProfile();
        return angular.extend(userProfile, response.data, {

          $refresh: fetchUserProfile,

          $clear: clearUserProfile,

          $hasRole: function (role) {
            return userProfile.roles.indexOf(role) >= 0;
          },

          $hasAnyRole: function (roles) {
            return !!userProfile.roles.filter(function (role) {
              return roles.indexOf(role) >= 0;
            }).length;
          },

          $isAnonymous: function () {
            return userProfile.anonymous;
          },

          $isAuthenticated: function () {
            return !userProfile.anonymous;
          }

        });
      });
    };

    return fetchUserProfile();
  }
})();
