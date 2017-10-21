(function() {

    'use strict';

    angular
        .module('rpdApp')
        .controller('Page8Controller', Page8Controller);

    function Page8Controller($http, $q, Data){
        var vm = this;
        vm.Init = function () {
            vm.rpdData = Data.rpdData;
            vm.rpdData = Data.GetData('rpdData');
            vm.IT = vm.rpdData.IT;
            vm.listSoft = [
                {
                    Name: "Добавить новое программное обспечение",
                    LicenseNumber: "-",
                    LicenseType: "-"
                }
            ];
            $http.get('/api/soft')
                .then(function(res) {
                    console.log(res.data);
                    for (var i = 0; i < res.data.data.length; i++)
                        vm.listSoft.push(res.data.data[i]);
                    console.log(vm.listSoft);
                }, function() {
                    console.log('Error function getSofts');
                });
        };

        // Список ПО
        vm.showFormSoft = function (indexSoft) {
            var addSoft = vm.IT.Soft[indexSoft].Name;
            if (addSoft == "Добавить новое программное обспечение") {
                vm.selectedIndexSoft = indexSoft;
                vm.newSoft = {
                    Name: "",
                    LicenseNumber: "-",
                    LicenseType: "Свободное программное обеспечение"
                };
                vm.formSoftShow = true;
            }
        };
        vm.addNewSoft = function (signal) {
            vm.formSoftShow = false;
            if(signal == 0) {
                vm.IT.Soft[vm.selectedIndexSoft] = vm.listSoft[1];
            }
            else if(signal == 1) {
                $http.post('/api/soft?name=' + vm.newSoft.Name +
                    '&licensenumber=' + vm.newSoft.LicenseNumber +
                    '&licensetype=' + vm.newSoft.LicenseType +
                    '&categorysoftware=1')
                    .then(function(res) {
                        console.log(res);
                    }, function() {
                        console.log(res);
                    });
                vm.IT.Soft[vm.selectedIndexSoft] = vm.newSoft;
                vm.listSoft.push(vm.newSoft);
            }
        };
        vm.addSoft = function() {
            vm.IT.Soft.push({
                "Name": "",
                "License": "",
                "id": "",
                "Version": ""
            });
        };
        vm.delSoft = function(softIndex) {
            vm.IT.Soft.splice(softIndex, 1);
        };

        // Перечень информационных СС
        vm.addCat = function() {
            vm.IT.Catalog.push({});
        };
        vm.delCat = function(catIndex) {
            vm.IT.Catalog.splice(catIndex, 1);
        };

    }
})();
