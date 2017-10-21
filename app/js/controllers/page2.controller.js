(function() {

    'use strict';

    angular
        .module('rpdApp')
        .controller('Page2Controller', Page2Controller);

    function Page2Controller(){
        var vm = this;
        vm.data = templateRPD;

        vm.check = function () {

        }

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
            var competenceKnow = vm.addNoDuplicate(vm.data.General.ZUV.Know, vm.data.General.Competences);
            vm.data.General.ZUV.Know.push({
                "Competence": competenceKnow,
                "Description": ""
            });
        };
        vm.delKnow = function(knowIndex) {
            templateRPD.General.ZUV.Know.splice(knowIndex, 1);
        };
        vm.addCan = function() {
            var competenceCan = vm.addNoDuplicate(vm.data.General.ZUV.Can, vm.data.General.Competences);
            templateRPD.General.ZUV.Can.push({
                "Competence": competenceCan,
                "Description": ""
            });
        };
        vm.delCan = function(canIndex) {
            templateRPD.General.ZUV.Can.splice(canIndex, 1);
        };
        vm.addGet = function() {
            var competenceGet = vm.addNoDuplicate(vm.data.General.ZUV.Get, vm.data.General.Competences);
            templateRPD.General.ZUV.Get.push({
                "Competence": competenceGet,
                "Description": ""
            });
        };
        vm.delGet = function(getIndex) {
            templateRPD.General.ZUV.Get.splice(getIndex, 1);
        };
    }
})();
