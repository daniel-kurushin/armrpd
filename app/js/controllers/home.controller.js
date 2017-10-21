(function() {

  'use strict';

  angular
      .module('rpdApp')
      .controller('HomeController', HomeController);

  function HomeController($http, $q, Data) {
      var vm = this;
      vm.LoadListChairs = function () {
          vm.formChairShow=true;
          // vm.listChair = [
          //     {
          //         Fullname: 'ИТАС - Информационные технологии и автоматизированные системы',
          //         Name: 'ИТАС',
          //         id: '1'
          //     }
          // ];
          var deferred = $q.defer();
          $http.get('/ias/chairs')
              .then(function(res) {
                  vm.listChair = res.data;
                  deferred.resolve(true);
              }, function() {
                  deferred.reject();
              });
          return deferred.promise;
      };
      vm.LoadDataChair = function (chair) {
          vm.formChairShow=false;
          var ids = {
              id_chair: chair.id
          };
          Data.SaveData('ids', ids);
          Data.ids = ids;
          Data.SaveData('chair', chair);
          Data.chair = chair;
      };
  }

})();
