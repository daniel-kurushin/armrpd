(function() {

    'use strict';

    angular
        .module('rpdApp')
        .controller('DisciplineController', DisciplineController);

    function DisciplineController($q, $http, Data) {
        var vm = this;
        vm.Init = function () {
            if(vm.data == undefined) {
                vm.rpdData = templateRPD;
                vm.EduForm = '';
                vm.Direction  = {};
                vm.Profile = {};
                vm.RUP = {};
                vm.Group = {};
                vm.listFormEdu = [];
                vm.listDirection = {};
                vm.listProfile = {};
                vm.listRUP = {};
                vm.listGroup = {};
                vm.listDiscipline = [];
                vm.chair = Data.chair;
                vm.chair = Data.GetData('chair');
                $http.get('/ias/getinfochair/' + vm.chair.id)
                    .then(function (res) {
                        Data.SaveData('dataChair', res.data);
                        vm.ids = Data.ids;
                        vm.ids = Data.GetData('ids');
                        vm.data = res.data;
                        vm.LoadFormEdus();
                    }, function () {
                    });
            }
        };
        vm.LoadFormEdus = function () {
            vm.EduForm = '';
            vm.Direction = {};
            vm.Profile = {};
            vm.RUP = {};
            vm.Group = {};
            for (var i = 0; i < vm.data.length; i++) {
                var row = vm.data[i];
                if (vm.listFormEdu.includes(row['формаОбучения']))
                    continue;
                vm.listFormEdu.push(row['формаОбучения']);
            }
        };
        vm.LoadDirections = function () {
            vm.listDirection = {};
            vm.listProfile = {};
            vm.listRUP = {};
            vm.listGroup = {};
            vm.listDiscipline = [];
            vm.Direction = {};
            vm.Profile = {};
            vm.RUP = {};
            vm.Group = {};
            for (var i = 0; i < vm.data.length; i++) {
                var row = vm.data[i];
                if(row['направление'] in vm.listDirection)
                    continue;
                if (vm.data[i]['формаОбучения'] === vm.EduForm)
                    vm.listDirection[row['направление']] ={
                        Name: row['направление'],
                        id: row['ИД_направления']
                    };
            }
        };
        vm.LoadProfiles = function () {
            vm.listProfile = {};
            vm.listRUP = {};
            vm.listGroup = {};
            vm.listDiscipline = [];
            vm.Profile = {};
            vm.RUP = {};
            vm.Group = {};
            for (var i = 0; i < vm.data.length; i++) {
                var row = vm.data[i];
                if(row['профиль'] in vm.listProfile)
                    continue;
                if (row['формаОбучения'] === vm.EduForm &&
                    row['направление'] === vm.Direction.Name)
                    vm.listProfile[row['профиль']] = {
                        Name: row['профиль'],
                        id: row['ИД_профиля']
                    };
            }
        };
        vm.LoadRUPs = function () {
            vm.listRUP = {};
            vm.listGroup = {};
            vm.listDiscipline = [];
            vm.RUP = {};
            vm.Group = {};
            for (var i = 0; i < vm.data.length; i++) {
                var row = vm.data[i];
                if(row['РУП'] in vm.listRUP)
                    continue;
                if (row['формаОбучения'] === vm.EduForm &&
                    row['направление'] === vm.Direction.Name &&
                    row['профиль'] === vm.Profile.Name)
                    vm.listRUP[row['РУП']] = {
                        Name: row['РУП'],
                        id: row['ИД_РУП']
                    };
            }
        };
        vm.LoadGroups = function () {
            vm.listGroup = {};
            vm.listDiscipline = [];
            vm.Group = {};
            for (var i = 0; i < vm.data.length; i++) {
                var row = vm.data[i];
                if(row['Группа'] in vm.listGroup)
                    continue;
                if (row['формаОбучения'] === vm.EduForm &&
                    row['направление'] === vm.Direction.Name &&
                    row['профиль'] === vm.Profile.Name &&
                    row['РУП'] === vm.RUP.Name)
                    vm.listGroup[row['Группа']] = {
                        Name: row['Группа'],
                        id: row['ИД_группы']
                    };
            }
        };
        vm.LoadDisciplines = function () {
            vm.listDiscipline = {};
            for (var i = 0; i < vm.data.length; i++) {
                var row = vm.data[i];
                if(row['Дисциплина'] in vm.listDiscipline)
                    continue;
                if (row['формаОбучения'] === vm.EduForm &&
                    row['направление'] === vm.Direction.Name &&
                    row['профиль'] === vm.Profile.Name &&
                    row['РУП'] === vm.RUP.Name &&
                    row['Группа'] === vm.Group.Name)
                    vm.listDiscipline[row['Дисциплина']] = {
                        Name: row['Дисциплина'],
                        id: row["ИД_дисциплины"],
                        Group: row["ИД_группы"]
                    };
            }
        };
        vm.Develop = function (discipline) {
            vm.ids.id_direction = vm.Direction.id;
            vm.ids.id_profile = vm.Profile.id;
            vm.ids.id_rup = vm.RUP.id;
            vm.ids.id_group = vm.Group.id;
            vm.ids.id_discipline = discipline.id;
            Data.SaveData('ids', vm.ids);
            Data.ids = vm.ids;

            vm.rpdData.Titul.EduForm = vm.EduForm;
            vm.rpdData.Titul.Profile = vm.Profile.Name;
            vm.rpdData.Titul.Name = discipline.Name;
            Data.SaveData('rpdData', vm.rpdData);
            Data.rpdData = vm.rpdData;
        }
    }

})();
