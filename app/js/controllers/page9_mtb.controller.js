(function() {

    'use strict';

    angular
        .module('rpdApp')
        .controller('Page9Controller', Page9Controller);

    function Page9Controller($http, $q, Data){
        var vm = this;

        vm.Init = function () {
            // vm.rpdData = Data.GetData('rpdData');
            vm.MTB = Data.rpdData.MTB;
            // vm.listDevice = listDevice;
            vm.listClass = [
                {
                    id: "",
                    Name: "",
                    Chair: "",
                    Number: "Добавить новую аудиторию",
                    Area: "",
                    CountSeat: ""
                }
            ];
            vm.listDevice = [
                {
                    id: "0",
                    Name: "Добавить новое оборудование",
                    Count: "",
                    Form: "",
                    NumberClassroom: ""
                }
            ];
            $http.get('/api/lab')
                .then(function(res) {
                    for (var i = 0; i < res.data.data.length; i++)
                        vm.listClass.push(res.data.data[i]);
                }, function() {
                    console.log('Error function getLabs');
                });
            $http.get('/api/equip')
                .then(function(res) {
                    for (var i = 0; i < res.data.data.length; i++)
                        vm.listDevice.push(res.data.data[i]);
                    console.log(vm.listDevice);
                }, function() {
                    console.log('Error function getDevices');
                });
        };

        // Перечень аудиторий, лабораторий
        vm.showFormClass = function (indexClass) {
            var addClass = vm.MTB.Classroom[indexClass].Number;
            if (addClass == "Добавить новую аудиторию") {
                vm.selectedIndexClass = indexClass;
                vm.newClass = {
                    Name: "",
                    Chair: "Кафедра",
                    Number: "",
                    Area: "",
                    CountSeat: ""
                };
                vm.formClassShow = true;
            }
        };
        vm.addNewClass = function (signal) {
            vm.formClassShow = false;
            if(signal == 0) {
                vm.MTB.Classroom[vm.selectedIndexClass] = vm.listClass[1];
            }
            else if(signal == 1) {
                vm.MTB.Classroom[vm.selectedIndexClass] = vm.newClass;
                vm.listClass.push(vm.newClass);
                $http.post('/api/lab?name=' + vm.newClass.Name +
                    '&numberlab=' + vm.newClass.Number +
                    '&numberofseats=' + vm.newClass.CountSeat +
                    '&area=' + vm.newClass.Area +
                    '&departmentias=' + vm.newClass.Chair)
                    .then(function(res) {
                        console.log(res);
                    }, function() {
                        console.log(res);
                    });
            }
        };
        vm.addClass = function() {
            vm.MTB.Classroom.push({
                Name: "",
                Chair: "",
                Number: "",
                Area: "",
                CountSeat: ""
            });
        };
        vm.delClass = function(classIndex) {
            vm.MTB.Classroom.splice(classIndex, 1);
        };

        // Перечень оборудования
        vm.showFormDevice = function (indexDevice) {
            var addDevice = vm.MTB.Devices[indexDevice].Name;
            if (addDevice == "Добавить новое оборудование") {
                vm.selectedIndexDevice = indexDevice;
                vm.newDevice = {
                    Name: "",
                    Count: "",
                    Form: "",
                    NumberClassroom: ""
                };
                vm.formDeviceShow = true;
            }
        };
        vm.addNewDevice = function (signal) {
            vm.formDeviceShow = false;
            if(signal == 0) {
                vm.MTB.Devices[vm.selectedIndexDevice] = vm.listDevice[1];
            }
            else if(signal == 1) {
                $http.post('/api/equip?name=' + vm.newDevice.Name +
                    '&numberlab=' + vm.newDevice.NumberClassroom +
                    '&numberofseats=' + vm.newDevice.Count +
                    '&typeofownership=' + vm.newDevice.Form)
                    .then(function(res) {
                        console.log(res);
                    }, function() {
                        console.log(res);
                    });
                vm.MTB.Devices[vm.selectedIndexDevice] = vm.newDevice;
                vm.listDevice.push(vm.newDevice);
            }
        };
        vm.addDevice = function() {
            vm.MTB.Devices.push({
                Name: "",
                Count: "",
                Form: "",
                NumberClassroom: ""
            });
        };
        vm.delDevice = function(deviceIndex) {
            vm.MTB.Devices.splice(deviceIndex, 1);
        };

    }
})();
