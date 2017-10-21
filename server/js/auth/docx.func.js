var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

function generateDocx(req, res, next) {
    var content = fs.readFileSync(path.resolve(__dirname, 'input.docx'), 'binary');
    var zip = new JSZip(content);
    var doc = new Docxtemplater();
    doc.loadZip(zip);
    var data = req.body.data;
    var varDev = [];
    for(var i = 0; i < data.TwoPage.Developers.length; i++) {
        var d = data.TwoPage.Developers[i];
        varDev.push({
            DevGrade: d.grade,
            DevRank: d.rank,
            DevFio: d.fio
        });
    }
    var varCompetence = [];
    for(var i = 0; i < data.General.Competences.length; i++) {
        var c = data.General.Competences[i];
        varCompetence.push({
            CompetenceName: c.Name,
            CompetenceDescription: c.Description,
        });
    }
    var varKnow = [];
    for(var i = 0; i < data.General.ZUV.Know.length; i++) {
        var know = data.General.ZUV.Know[i];
        varKnow.push({
            KnowDescription: know.Description,
            KnowCompetence: know.Competence
        });
    }
    var varCan = [];
    for(var i = 0; i < data.General.ZUV.Can.length; i++) {
        var can = data.General.ZUV.Can[i];
        varCan.push({
            CanDescription: can.Description,
            CanCompetence: can.Competence
        });
    }
    var varGet = [];
    for(var i = 0; i < data.General.ZUV.Get.length; i++) {
        var get = data.General.ZUV.Get[i];
        varGet.push({
            GetDescription: get.Description,
            GetCompetence: get.Competence
        });
    }
    var varTheme = [];
    for(var i = 0; i < data.AmountContent.length; i++) {
        var theme = data.AmountContent[i];
        var Lec = [];
        for(var j = 0; j < theme.lecs.length; j++) {
            var lec = theme.lecs[j];
            Lec.push({
                LecName: lec.Name,
                LecDescription: lec.Description,
                LecHour: lec.hours
            });
        }
        var Prac = [];
        for(var j = 0; j < theme.pracs.length; j++) {
            var prac = theme.pracs[j];
            Prac.push({
                PracName: prac.Name,
                PracDescription: prac.Description,
                PracHour: prac.hours
            });
        }
        var Lab = [];
        for(var j = 0; j < theme.labs.length; j++) {
            var lab = theme.labs[j];
            Lab.push({
                LabName: lab.Name,
                LabDescription: lab.Description,
                LabHour: lab.hours
            });
        }
        var Sam = [];
        for(var j = 0; j < theme.srs.length; j++) {
            var srs = theme.srs[j];
            Sam.push({
                SamDescription: srs.Description,
                SamHour: srs.hours
            });
        }
        var Theme = [];
        if(Lec.length == 0) {
          Lec.push({
            LecName:'',
            LecDescription: 'В данной теме нет лекций.',
            LecHour: '-'
          });
        }
        if(Prac.length == 0) {
          Prac.push({
            PracName:'',
            PracDescription: 'В данной теме нет практических занятий.',
            PracHour: '-'
          });
        }
        if(Lab.length == 0) {
          Lab.push({
            LabName:'',
            LabDescription: 'В данной теме нет лабораторных работ.',
            LabHour: '-'
          });
        }
        if(Sam.length == 0) {
          Sam.push({
            SamDescription: 'В данной теме нет самостоятельных работ нет.',
            SamHour: '-'
          });
        }
        Theme.push({
            ThemeName: theme.Name,
            ThemeDescription: theme.Description,
            Lec: Lec,
            Prac: Prac,
            Lab: Lab,
            Sam: Sam
        });
        varTheme.push(Theme);
    }
    var varUmo = [];
    for(var i = 0; i < data.UMO.length; i++) {
        var umo = data.UMO[i];
        varUmo.push({
            UmoName: umo.Name
        });
    }
    var varLitMain = [];
    var varLitAdd = [];
    var varLitEdu = [];
    var varLitPer = [];
    for(var i = 0; i < data.Literature.length; i++) {
        var lit = data.Literature[i];
        if (lit.Type == "Основная") {
            var len = varLitMain.length + 1;
            varLitMain.push({
                LitMainId: len,
                LitMainName: lit.Name
            });
        } else if (lit.Type == "Дополнительная") {
            var len = varLitAdd.length + 1;
            varLitAdd.push({
                LitAddId: len,
                LitAddName: lit.Name
            });
        } else if (lit.Type == "Учебная") {
            var len = varLitEdu.length + 1;
            varLitEdu.push({
                LitEduId: len,
                LitEduName: lit.Name
            });
        } else if (lit.Type == "Периодическое издание") {
            var len = varLitPer.length + 1;
            varLitPer.push({
                LitPerId: len,
                LitPerName: lit.Name
            });
        }
    }
    var varSoft = [];
    for(var i = 0; i < data.IT.Soft.length; i++) {
        var soft = data.IT.Soft[i];
        var len = varSoft.length + 1;
        varSoft.push({
            SoftId: len,
            SoftName: soft.Name,
        });
    }
    var varCat = [];
    for(var i = 0; i < data.IT.Catalog.length; i++) {
        var cat = data.IT.Catalog[i];
        var len = varCat.length + 1;
        varCat.push({
            CatId: len,
            CatName: cat.Name,
        });
    }
    var varClass = [];
    for(var i = 0; i < data.MTB.Classroom.length; i++) {
        var cr = data.MTB.Classroom[i];
        var len = varClass.length + 1;
        varClass.push({
            ClassId: len,
            ClassName: cr.Name,
            ClassChair: cr.Chair,
            ClassNumber: cr.Number,
            ClassArea: cr.Area,
            ClassCount: cr.CountSeat
        });
    }
    var varDevice = [];
    for(var i = 0; i < data.MTB.Devices.length; i++) {
        var d = data.MTB.Devices[i];
        var len = varDevice.length + 1;
        varDevice.push({
            DeviceId: len,
            DeviceName: d.Name,
            DeviceCount: d.Count,
            DeviceForm: d.Form,
            DeviceNumberClass: d.NumberClassroom
        });
    }
    doc.setData({
        //Titul
        Department: data.Titul.Department,
        Chair: data.Titul.Chair,
        NameRpd: data.Titul.Name,
        EduProgram: data.Titul.EduProgram,
        Direction: data.Titul.Direction,
        Profile: data.Titul.Profile,
        Skill: data.Titul.Skill,
        EduForm: data.Titul.EduForm,
        Course: data.Titul.Course,
        Semester: data.Titul.Semester,
        Credit: data.Titul.Credit,
        Hour: data.Titul.Hour,
        EkzSem: data.Titul.EkzSem,
        ZachSem: data.Titul.ZachSem,
        ProjSem: data.Titul.ProjSem,
        WorkSem: data.Titul.WorkSem,
        Year: data.Titul.Year,
        //Two page
        DocGovNumber: data.TwoPage.Docs.GovNumber,
        DocGovDate: data.TwoPage.Docs.GovDate,
        DocVuzDate: data.TwoPage.Docs.VuzDate,
        Dev: varDev,
        ProtocolDate: data.TwoPage.Protoсol.Date,
        ProtocolNumber: data.TwoPage.Protoсol.Number,
        LChair: data.TwoPage.LeadingChair.name,
        LChairGrade: data.TwoPage.LeadingChair.grade,
        LChairRank: data.TwoPage.LeadingChair.rank,
        LChairFio: data.TwoPage.LeadingChair.fio,
        GChair: data.TwoPage.GraduatingChair.name,
        GChairGrade: data.TwoPage.GraduatingChair.grade,
        GChairRank: data.TwoPage.GraduatingChair.rank,
        GChairFio: data.TwoPage.GraduatingChair.fio,
        UopChairGrade: data.TwoPage.GraduatingChair.grade,
        UopChairRank: data.TwoPage.UopChair.rank,
        UopChairFio: data.TwoPage.UopChair.fio,
        //General
        GeneralGoal: data.General.Goal,
        Competence: varCompetence,
        Know: varKnow,
        Can: varCan,
        Get: varGet,
        GeneralParam1: data.General.Param1,
        GeneralParam2: data.General.Param2,
        Theme: varTheme,
        HourKr: data.Hours.Kr,
        HourKsr: data.Hours.Ksr,
        HourEkz: data.Hours.Ekz,
        HourTotal: data.Hours.Total,
        HourLec: data.Hours.Lec,
        HourPrac: data.Hours.Prac,
        HourLab: data.Hours.Lab,
        HourSrs: data.Hours.Srs,
        //Other
        Umo: varUmo,
        LitMain: varLitMain,
        LitAdd: varLitAdd,
        LitEdu: varLitEdu,
        LitPer: varLitPer,
        Soft: varSoft,
        Cat: varCat,
        Class: varClass,
        Device: varDevice
    });

    try {
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        throw error;
    }

    var buf = doc.getZip().generate({type: 'nodebuffer'});
    fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);
    getDocx(req, res, next);
}

function getDocx(req, res, next) {
    var file = path.resolve(__dirname, 'output.docx');
    var filename = path.basename(file);
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.download(file);
}
// var express = require('express');
// var fs = require('fs');
// var jsonfile = require('jsonfile');
// var Docxtemplater = require('docxtemplater');
// var JSZip = require('jszip');
//
// var path = require('path');
// var mime = require('mime');
// var request = require('request');
//
// var dataJSON = jsonfile.readFileSync(__dirname + '/page1data.json');
// var content = fs.readFileSync(__dirname + '/shablon.docx','binary');
// var zip = new JSZip(content);
// var doc=new Docxtemplater().loadZip(zip);

//docx2pdf
// var req = require('request');

// req = req.defaults({
// 	agent: false
// });

// module.exports = function(buf, callback) {
// 	var r = req.post('http://mirror1.convertonlinefree.com', {
// 		encoding: null,
// 		headers: {
// 			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.94 Safari/537.36'
// 		}
// 	}, function(err, res) {
// 		if (err) return callback(err);
// 		callback(null, res.body);
// 	});

// 	var form = r.form();
// 	form.append('__EVENTTARGET', '');
// 	form.append('__EVENTARGUMENT', '');
// 	form.append('__VIEWSTATE', '');
// 	form.append('ctl00$MainContent$fu', buf, {
// 		filename: 'output.docx',
// 		contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
// 	});

// 	form.append('ctl00$MainContent$btnConvert', 'Convert');
// 	form.append('ctl00$MainContent$fuZip', '');
// };


// if (require.main !== module) return;

// module.exports(fs.readFileSync(__dirname+'/result.docx'), function(err, data) {
// 	fs.writeFileSync(__dirname+'/result.pdf', data);
// });

// End Code Aydar


// var app = express();
// app.use(express.static('App'));
//
// app.get('/download', function (req, res) {
//     console.log('This test in server js');
//
//     doc.setData({
//         'department':	dataJSON.Department,
//         'chair':		dataJSON.Chair,
//         'name_rpd':		dataJSON.Name,
//         'edu_program':	dataJSON.EduProgram,
//         'direction':	dataJSON.Direction,
//         'profile':		dataJSON.Profile,
//         'skill':		dataJSON.Skill,
//         'edu_form':		dataJSON.EduForm,
//         'course':		dataJSON.Course,
//         'semester':		dataJSON.Semester,
//         'credit':		dataJSON.Credit,
//         'hour':			dataJSON.Hour,
//         'ekz_sem':		dataJSON.EkzSem,
//         'zach_sem':		dataJSON.ZachSem,
//         'proj_sem':		dataJSON.ProjSem,
//         'work_sem':		dataJSON.WorkSem,
//         'year': 		dataJSON.Year
//     });
//
//     doc.render();
//     var buf = doc.getZip().generate({type:'nodebuffer'});
//     fs.writeFileSync(__dirname+'/App/result.docx', buf);
//
//     var file = __dirname + '/App/result.pdf';
//
//     var data = fs.readFileSync(file);
//     res.contentType("application/pdf");
//
//     res.send(data);
//
// });

module.exports = {
    generateDocx,
    getDocx
};
