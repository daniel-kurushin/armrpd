(function() {

    'use strict';

    angular
        .module('rpdApp')
        .controller('DevController', DevController);

    function DevController($http, $q, Data) {
        var vm = this;
        vm.SelectTab = function (selectedTab) {
            vm.selectedTab = selectedTab;
            Data.SaveVar('selectedTab', selectedTab);
        };
        vm.Init = function () {
            vm.selectedTab = Data.GetVar('selectedTab');
            vm.chair = Data.chair;
            vm.chair = Data.GetData('chair');
            vm.ids = Data.ids;
            vm.ids = Data.GetData('ids');
            vm.GetTitul();
        };
        vm.GetTitul = function () {
            var deferred = $q.defer();
            $http.get('/ias/gettitul/' +
                vm.ids.id_discipline + '&' +
                vm.chair.id + '&' +
                vm.ids.id_rup)
                .then(function (res) {
                    vm.rpdData = Data.rpdData;
                    vm.rpdData.Titul.Department = res.data[0]['Факультет'];
                    vm.rpdData.Titul.Chair = res.data[0]['Кафедра'];
                    vm.rpdData.Titul.Direction = res.data[0]['ШифрНаправления'] + ' - "' + res.data[0]['Направление'] + '"';
                    vm.rpdData.Titul.Skill = res.data[0]['Квалификация'];
                    vm.rpdData.Titul.Hour = res.data[0]['Часов'];
                    vm.rpdData.Hours.Total = res.data[0]['Часов'];
                    vm.rpdData.Titul.Credit = res.data[0]['Кредитов'];
                    vm.GetHours();
                    deferred.resolve(true);
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };
        vm.GetHours = function () {
            var deferred = $q.defer();
            $http.get('/ias/gethours/' +
                vm.ids.id_discipline + '&' +
                vm.ids.id_rup)
                .then(function (res) {
                    var course = [];
                    var semester = [];
                    for(var i = 0; i < res.data.length; i++) {
                        if(!(course.includes(res.data[i]['Курс']))) {
                            course.push(res.data[i]['Курс']);
                        }
                        if(!(semester.includes(res.data[i]['Семестр']))) {
                            semester.push(res.data[i]['Семестр']);
                        }
                        switch(res.data[i]['ВидУчебнойДеятельности']) {
                            case 'Лекция':
                                vm.rpdData.Hours.Lec = res.data[i]['КоличествоЧасов'];
                                break;
                            case 'Практическое занятие':
                                vm.rpdData.Hours.Prac = res.data[i]['КоличествоЧасов'];
                                break;
                            case 'Лабораторная работа':
                                vm.rpdData.Hours.Lab = res.data[i]['КоличествоЧасов'];
                                break;
                            case 'Самостоятельная работа студента':
                                vm.rpdData.Hours.Srs = res.data[i]['КоличествоЧасов'];
                                break;
                            case 'Экзамен':
                                vm.rpdData.Hours.Ekz = res.data[i]['КоличествоЧасов'];
                                vm.rpdData.Titul.EkzSem = res.data[i]['Семестр'] + ' семестр';
                                break;
                            case 'Курсовая работа':
                                vm.rpdData.Hours.Kr = res.data[i]['КоличествоЧасов'];
                                vm.rpdData.Titul.WorkSem = res.data[i]['Семестр'] + ' семестр';
                                break;
                            case 'Контроль самостоятельной работы':
                                vm.rpdData.Hours.Ksr = res.data[i]['КоличествоЧасов'];
                                break;
                        }
                    }
                    var str = course[0];
                    for (var i = 1; i < course.length; i++) {
                        str += ', ' + course[i];
                    }
                    vm.rpdData.Titul.Course = str;
                    str = semester[0];
                    for (var i = 1; i < semester.length; i++) {
                        str += ', ' + semester[i];
                    }
                    vm.rpdData.Titul.Semester = str;
                    vm.rpdData.HoursAll.push(vm.rpdData.Hours.Lec);
                    vm.rpdData.HoursAll.push(vm.rpdData.Hours.Lab);
                    vm.rpdData.HoursAll.push(vm.rpdData.Hours.Prac);
                    vm.rpdData.HoursAll.push(vm.rpdData.Hours.Srs);
                    vm.hoursLast = [];
                    vm.hoursLast.push(vm.rpdData.Hours.Lec);
                    vm.hoursLast.push(vm.rpdData.Hours.Lab);
                    vm.hoursLast.push(vm.rpdData.Hours.Prac);
                    vm.hoursLast.push(vm.rpdData.Hours.Srs);
                    vm.rpdData.Titul.Year = (new Date()).getFullYear();
                    vm.GetCompetence();
                    deferred.resolve(true);
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        vm.GetCompetence = function () {
            var deferred = $q.defer();
            // '/getcompetences/:idDiscip&:idGroup&:idDep'
            $http.get('/ias/getcompetences/' +
                vm.ids.id_discipline + '&' +
                vm.ids.id_group + '&' +
                vm.chair.id)
                .then(function (res) {
                    for (var i = 0; i < res.data.length; i++) {
                        vm.rpdData.General.Competences.push({
                            "Name": res.data[i].shortName,
                            "Description":	res.data[i].fullName,
                            "PrevDiscipline": [],
                            "NextDiscipline": []
                        });
                    }
                    vm.addTheme();
                    deferred.resolve(true);
                }, function () {
                    deferred.reject();
                });
            return deferred.promise;
        };

        vm.ClearVar = Data.ClearVar;
        vm.CLearAllData = Data.CLearAllData;
        // vm.groups = [];
        // vm.LoadGroup = function () {
        //     vm.groups = [];
        //     for (var i = 0; i < disc.length; i++) {
        //         var exist = false;
        //         for (var j = 0; j < vm.groups.length; j++) {
        //             if (disc[i].Группа === vm.groups[j].Name)
        //             {
        //                 exist = true;
        //                 break;
        //             }
        //         }
        //         if(!exist) {
        //             vm.groups.push({
        //                 "Name": disc[i].Группа,
        //                 "id": "",
        //                 "list": []
        //             });
        //         }
        //     }
        // };

        // vm.LoadDiscipline = function (index) {
        //     if (vm.groups[index].list.length == 0) {
        //         var list = [];
        //         for (var i = 0; i < disc.length; i++) {
        //             if (disc[i].Группа === vm.groups[index].Name) {
        //                 list.push({
        //                     "Name": disc[i].Дисциплина,
        //                     "id": ""
        //                 });
        //             }
        //         }
        //         vm.groups[index].list = list;
        //     }
        // };

        vm.generateDocx = function () {
            var deferred = $q.defer();
            $http.post('/docx/generate', { data: vm.rpdData })
                .then(function(res) {
                    console.log("Success generate docx");
                    // window.open('/docx/get');
                }, function() {
                    deferred.reject();
                });
            return deferred.promise;
        };
        vm.SaveRpd = function () {
            var deferred = $q.defer();
            $http.post('/api/rpd?discipline=' + vm.ids.id_discipline +
                '&jsonrpd=' + JSON.stringify(vm.rpdData))
                .then(function(res) {
                    console.log("Success\n" + res);
                    generateDocx();
                }, function() {
                    deferred.reject();
                });
            return deferred.promise;
        };
        // Общие положения
        /*        $scope.$on('$viewContentLoaded', function(){
                    for (var i = 0; i < vm.data.General.Competences.length; i++){
                        var competence = vm.data.General.Competences[i].Name;
                        vm.data.General.ZUV.Know.push({
                            "Competence": competence,
                            "Description": ""
                        });
                        vm.data.General.ZUV.Can.push({
                            "Competence": competence,
                            "Description": ""
                        });
                        vm.data.General.ZUV.Get.push({
                            "Competence": competence,
                            "Description": ""
                        });
                    }
                });*/
        vm.addNoDuplicate = function (mas1, mas2) {
            var dict = [];
            for (var i = 0; i < mas1.length; i++)
            {
                var competence = mas1[i].Competence;
                if(!(dict.includes(competence)))
                    dict.push(competence);
            }
            var competenceReturn = "";
            for (var i = 0; i < mas2.length; i++)
            {
                var competence = mas2[i].Name;
                if(!(dict.includes(competence))) {
                    competenceReturn = competence;
                    break;
                }
            }
            return competenceReturn;
        };

        vm.addKnow = function() {
            var competenceKnow = vm.addNoDuplicate(vm.rpdData.General.ZUV.Know, vm.rpdData.General.Competences);
            vm.rpdData.General.ZUV.Know.push({
                "Competence": competenceKnow,
                "Description": ""
            });
        };
        vm.delKnow = function(knowIndex) {
            vm.rpdData.General.ZUV.Know.splice(knowIndex, 1);
        };
        vm.addCan = function() {
            var competenceCan = vm.addNoDuplicate(vm.rpdData.General.ZUV.Can, vm.rpdData.General.Competences);
            vm.rpdData.General.ZUV.Can.push({
                "Competence": competenceCan,
                "Description": ""
            });
        };
        vm.delCan = function(canIndex) {
            vm.rpdData.General.ZUV.Can.splice(canIndex, 1);
        };
        vm.addGet = function() {
            var competenceGet = vm.addNoDuplicate(vm.rpdData.General.ZUV.Get, vm.rpdData.General.Competences);
            vm.rpdData.General.ZUV.Get.push({
                "Competence": competenceGet,
                "Description": ""
            });
        };
        vm.delGet = function(getIndex) {
            vm.rpdData.General.ZUV.Get.splice(getIndex, 1);
        };

        // Перечень учебно-методического обеспечения
        vm.addUmo = function() {
            vm.rpdData.UMO.push({});
        };
        vm.delUmo = function(umoIndex) {
            vm.rpdData.UMO.splice(umoIndex, 1);
        };

        // Список литературы
        vm.addLit = function(litType) {
            switch (litType) {
                case 0:
                    vm.rpdData.Literature.Main.push({
                        Name: ""
                    });
                    break;
                case 1:
                    vm.rpdData.Literature.Add.push({
                        Name: ""
                    });
                    break;
                case 2:
                    vm.rpdData.Literature.Edu.push({
                        Name: ""
                    });
                    break;
                case 3:
                    vm.rpdData.Literature.Science.push({
                        Name: ""
                    });
                    break;
                case 4:
                    vm.rpdData.Literature.Period.push({
                        Name: ""
                    });
                    break;
                default:
            }
        };
        vm.delLit = function(litIndex, litType) {
            switch (litType) {
                case 0:
                    vm.rpdData.Literature.Main.splice(litIndex, 1);
                    break;
                case 1:
                    vm.rpdData.Literature.Add.splice(litIndex, 1);
                    break;
                case 2:
                    vm.rpdData.Literature.Edu.splice(litIndex, 1);
                    break;
                case 3:
                    vm.rpdData.Literature.Science.splice(litIndex, 1);
                    break;
                case 4:
                    vm.rpdData.Literature.Period.splice(litIndex, 1);
                    break;
                default:
            }
        };

        // Объем и содержание УД
        vm.numberOnKeyPress = function(e) {
            if(e.shiftKey || e.ctrlKey || e.altKey) {
                e.preventDefault();
            } else if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8) {
                e.preventDefault();
            } else if (e.keyCode == 48 && e.currentTarget.innerHTML == '') {
                e.preventDefault();
            }
        };
        vm.setCaretPosEnd = function(e) {
            e.currentTarget.innerHTML = '';
        }
        vm.recalcHours = function(themeIndex,index) {
            var theme = vm.rpdData.AmountContent[themeIndex];
            var contents = [];
            switch (index) {
                case 0:
                    contents = theme.lecs;
                    break;
                case 1:
                    contents = theme.labs;
                    break;
                case 2:
                    contents = theme.pracs;
                    break;
                case 3:
                    contents = theme.srs;
                    break;
                default:
            }
            var sumHours = 0;
            for (var i = 0; i < contents.length; i++) {
                if (contents[i].hours != '')
                    sumHours += parseInt(contents[i].hours);
            }
            theme.hours[index] = sumHours;
            vm.recalcHoursInfo(themeIndex, index);
            var sumLecs = 0;
            var sumLabs = 0;
            var sumPracs = 0;
            var sumSrs = 0;
            for (var i = 0; i < vm.rpdData.AmountContent.length; i++) {
                for (var j = 0; j < templateRPD.AmountContent[i].lecs.length; j++) {
                    if (vm.rpdData.AmountContent[i].lecs[j].hours != '')
                        sumLecs += parseInt(templateRPD.AmountContent[i].lecs[j].hours);
                }
                for (var j = 0; j < templateRPD.AmountContent[i].labs.length; j++) {
                    if (vm.rpdData.AmountContent[i].labs[j].hours != '')
                        sumLabs += parseInt(templateRPD.AmountContent[i].labs[j].hours);
                }
                for (var j = 0; j < templateRPD.AmountContent[i].pracs.length; j++) {
                    if (vm.rpdData.AmountContent[i].pracs[j].hours != '')
                        sumPracs += parseInt(templateRPD.AmountContent[i].pracs[j].hours);
                }
                for (var j = 0; j < templateRPD.AmountContent[i].srs.length; j++) {
                    if (vm.rpdData.AmountContent[i].srs[j].hours != '')
                        sumSrs += parseInt(templateRPD.AmountContent[i].srs[j].hours);
                }
            }
            vm.hoursLast[0] = parseInt(vm.rpdData.HoursAll[0]) - sumLecs;
            vm.hoursLast[1] = parseInt(vm.rpdData.HoursAll[1]) - sumLabs;
            vm.hoursLast[2] = parseInt(vm.rpdData.HoursAll[2]) - sumPracs;
            vm.hoursLast[3] = parseInt(vm.rpdData.HoursAll[3]) - sumSrs - 18;
            if (vm.hoursLast[0] < 0 || vm.hoursLast[1] < 0 || vm.hoursLast[2] < 0 || vm.hoursLast[3] < 0) {
                Materialize.toast('Введите правильное значение', 3000);
            }
        };
        vm.recalcIndexThemes = function() {
            var indexTheme = 1;
            for (var i = 0; i < vm.rpdData.AmountContent.length; i++) {
                var theme = vm.rpdData.AmountContent[i];
                theme.Name = 'Тема ' + indexTheme + '.';
                theme.Index = indexTheme;
                indexTheme++;
            }
        };
        vm.recalcIndexLecs = function() {
            var indexLec = 1;
            for (var i = 0; i < vm.rpdData.AmountContent.length; i++) {
                for (var j = 0; j < vm.rpdData.AmountContent[i].lecs.length; j++) {
                    var lec = vm.rpdData.AmountContent[i].lecs[j];
                    lec.Name = 'Лекция ' + indexLec + '.';
                    lec.Index = indexLec;
                    indexLec++;
                }
            }
        };
        vm.recalcIndexLabs = function() {
            var indexLab = 1;
            for (var i = 0; i < vm.rpdData.AmountContent.length; i++) {
                for (var j = 0; j < vm.rpdData.AmountContent[i].labs.length; j++) {
                    var lab = vm.rpdData.AmountContent[i].labs[j];
                    lab.Name = 'Лабораторная работа ' + indexLab + '.';
                    lab.Index = indexLab;
                    indexLab++;
                }
            }
        };
        vm.recalcIndexPracs = function() {
            var indexPrac = 1;
            for (var i = 0; i < vm.rpdData.AmountContent.length; i++) {
                for (var j = 0; j < vm.rpdData.AmountContent[i].pracs.length; j++) {
                    var prac = vm.rpdData.AmountContent[i].pracs[j];
                    prac.Name = 'Практическое занятие ' + indexPrac + '.';
                    prac.Index = indexPrac;
                    indexPrac++;
                }
            }
        };
        vm.recalcHoursInfo = function(themeIndex, index) {
            var theme = vm.rpdData.AmountContent[themeIndex];
            var contents = [];
            switch (index) {
                case 0:
                    contents = theme.lecs;
                    break;
                case 1:
                    contents = theme.labs;
                    break;
                case 2:
                    contents = theme.pracs;
                    break;
                case 3:
                    contents = theme.srs;
                    break;
                default:
            }
            theme.hoursInfo[index] = theme.hours[index] + '(' + contents.length + ')';
        };
        // function for theme
        vm.addTheme = function() {
            const themeIndex = vm.rpdData.AmountContent.length + 1;
            vm.rpdData.AmountContent.push({
                "Name": "Тема " + themeIndex + ".",
                "Index": themeIndex,
                "Description":"",
                "hours": [ "0", "0", "0", "0"],
                "hoursInfo": [ "0(0)", "0(0)", "0(0)", "0(0)"],
                "lecs": [],
                "labs": [],
                "pracs": [],
                "srs": []
            });
            vm.recalcIndexThemes();
        };
        vm.delTheme = function(themeIndex) {
            vm.rpdData.AmountContent.splice(themeIndex, 1);
            // if (templateRPD.AmountContent.length == 0)
            //     vm.addTheme();
            vm.recalcIndexThemes();
            vm.recalcHours(0, 0); // TODO: переписать
        };
        // function for lecs
        vm.addLec = function(themeIndex) {
            const lecIndex = vm.rpdData.AmountContent[themeIndex].lecs.length + 1;
            vm.rpdData.AmountContent[themeIndex].lecs.push({
                'Name':'Лекция ' + lecIndex + '.',
                'Index': lecIndex,
                'Description': '',
                'Content': '',
                'hours': ''
            });
            vm.recalcIndexLecs();
            vm.recalcHoursInfo(themeIndex, 0);
        };
        vm.delLec = function(themeIndex,lecIndex) {
            vm.rpdData.AmountContent[themeIndex].lecs.splice(lecIndex, 1);
            vm.recalcHours(themeIndex, 0);
            vm.recalcIndexLecs();
        };
        // function for pracs
        vm.addPrac = function(themeIndex) {
            const pracIndex = vm.rpdData.AmountContent[themeIndex].pracs.length + 1;
            vm.rpdData.AmountContent[themeIndex].pracs.push({
                'Name':'Практическое занятие ' + pracIndex + '.',
                'Index': pracIndex,
                'Description': '',
                'hours': ''
            });
            vm.recalcIndexPracs();
            vm.recalcHoursInfo(themeIndex, 2);
        };
        vm.delPrac = function(themeIndex,pracIndex) {
            vm.rpdData.AmountContent[themeIndex].pracs.splice(pracIndex, 1);
            vm.recalcHours(themeIndex, 2);
            vm.recalcIndexPracs();
        };
        // function for labs
        vm.addLab = function(themeIndex) {
            const labIndex = vm.rpdData.AmountContent[themeIndex].labs.length + 1;
            vm.rpdData.AmountContent[themeIndex].labs.push({
                'Name':'Лабораторная работа ' + labIndex + '.',
                'Index': labIndex,
                'Description': '',
                'hours': ''
            });
            vm.recalcIndexLabs();
            vm.recalcHoursInfo(themeIndex, 1);
        };
        vm.delLab = function(themeIndex,labIndex) {
            vm.rpdData.AmountContent[themeIndex].labs.splice(labIndex, 1);
            vm.recalcHours(themeIndex, 1);
            vm.recalcIndexLabs();
        };
        // function for srs
        vm.addSam = function(themeIndex) {
            vm.rpdData.AmountContent[themeIndex].srs.push({
                'Content': '',
                'hours': ''
            });
            vm.recalcHoursInfo(themeIndex, 3);
        };
        vm.delSam= function(themeIndex,samIndex) {
            vm.rpdData.AmountContent[themeIndex].srs.splice(samIndex, 1);
            vm.recalcHours(themeIndex, 3);
        };
    }

})();
