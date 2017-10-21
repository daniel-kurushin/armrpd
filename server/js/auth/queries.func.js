var promise = require('bluebird');

var options = {
    promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:adminpg@192.168.0.10:5432/dbarm';
var db = pgp(connectionString);

// function getAll
//справочник ПО
function getAllSoft(req, res, next){
    db.query('Select t1.name "Name", t1.licensenumber "LicenseNumber", t1.licensetype LicenseType, t2.name  from software t1 join categorysoftware t2 on t2.id = t1.categorysoftware order by 2')
        .then(function(data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Get all soft'
                });
        })
        .catch(function (err){
            return next(err);
        });
}
//справочник Категории ПО
function getAllCatSoft(req, res, next){
    db.query('Select * from categorysoftware order by 1')
        .then(function(data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Get all catsoft'
                });
        })
        .catch(function (err){
            return next(err);
        });
}
//справочник Лабораторий
function getAllLab(req, res, next){
    db.query('Select id, Name "Name", departmentias "Chair", numberlab "Number", Area "Area", numberofseats "Countseat" from DirectoryLab order by 4')
        .then(function(data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Get all laboratories'
                });
        })
        .catch(function (err){
            return next(err);
        });
}
//справочник Оборудований
function getAllEquip(req, res, next){
    db.query('Select * from DirectoryEquipment order by 1')
        .then(function(data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Get all equipments'
                });
        })
        .catch(function (err){
            return next(err);
        });
}
//Таблица RPD
function getAllRpd(req, res, next){
    db.query('Select * from RPD order by 1')
        .then(function(data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Get all RPD'
                });
        })
        .catch(function (err){
            return next(err);
        });
}
// END getAll
// ADD functions
function createCatSoft(req, res, next) {
    db.query('insert into categorysoftware(name, comment)' +
        'values(${name},${comment});'+
        "SELECT currval(pg_get_serial_sequence('categorysoftware', 'id'));", req.query)
        .then(function (data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Inserted one categorysoftware'
                });
        })
        .catch(function(err){
            return next(err);
        });
}
function createSoft(req, res, next) {
    db.query('insert into software(name, licensenumber, licensetype, categorysoftware)' +
        'values(${name},${licensenumber},${licensetype},${categorysoftware});'+
        "SELECT currval(pg_get_serial_sequence('software', 'id'));", req.query)
        .then(function (data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Inserted one software'
                });
        })
        .catch(function(err){
            return next(err);
        });
}
function createLab(req, res, next) {
    db.query('insert into DirectoryLab(name, numberlab, numberofseats, area, departmentias)' +
        'values(${name},${numberlab},${numberofseats},${area}, ${departmentias});'+
        "SELECT currval(pg_get_serial_sequence('DirectoryLab', 'id'));", req.query)
        .then(function (data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Inserted one lab'
                });
        })
        .catch(function(err){
            return next(err);
        });
}
function createEquip(req, res, next) {
    db.query('insert into DirectoryEquipment(name, numberlab, numberofseats, typeofownership)' +
        'values(${name},${numberlab},${numberofseats},${typeofownership});'+
        "SELECT currval(pg_get_serial_sequence('DirectoryEquipment', 'id'));", req.query)
        .then(function (data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Inserted one equipment'
                });
        })
        .catch(function(err){
            return next(err);
        });
}
function createTheme(req, res, next) {
    db.query('insert into theme(name, serialnumber, keywords, rpd)' +
        'values(${name},${serialnumber},${keywords},${rpd});'+
        "SELECT currval(pg_get_serial_sequence('theme', 'id'));", req.query)
        .then(function (data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Inserted one theme'
                });
        })
        .catch(function(err){
            return next(err);
        });
}
function createRpd(req, res, next) {
    db.query('insert into RPD(name, version, comment, pathpdf, pathfos, dateofreport, reportnumber, ' +
        'arguesperson, headofuop, discipline, faculty, leaddepartment, programm, directionofpreparation, profile, ' +
        'qualification, graduatedepartment, modeofstudy, course, creditze, totalhours, year, dateofapprovalrup, ' +
        'ordernumberfgos, dateofapprovalfgos, partofthetrainingcycle, typeofthetrainingcycle, jsonrpd)' +
        'values(${name},${version},${comment},${pathpdf},${pathfos},${dateofreport},${reportnumber},' +
        '${arguesperson},${headofuop},${discipline},${faculty},${leaddepartment},${programm},${directionofpreparation},${profile}, ' +
        '${qualification},${graduatedepartment},${modeofstudy},${course},${creditze},${totalhours},${year},${dateofapprovalrup}, ' +
        '${ordernumberfgos},${dateofapprovalfgos},${partofthetrainingcycle},${typeofthetrainingcycle},${jsonrpd});'+
        "SELECT currval(pg_get_serial_sequence('RPD', 'id'));", req.query)
        .then(function (data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Inserted one RPD'
                });
        })
        .catch(function(err){
            return next(err);
        });
}
function createRpdTemp(req, res, next) {
    db.query('insert into RPD(discipline, jsonrpd)' +
        'values(${discipline},${jsonrpd});'+
        "SELECT currval(pg_get_serial_sequence('RPD', 'id'));", req.query)
        .then(function (data){
            res.status(200)
                .json({
                    status: 'success',
                    data: data,
                    message: 'Inserted one RPD'
                });
        })
        .catch(function(err){
            return next(err);
        });
}
//END ADD functions
function getSingleCatSoft(req, res, next){
    var catSoftID = parseInt(req.params.id);
    db.query('Select * from categorysoftware where id = $1', catSoftID)
        .then(function(){
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Get ONE categorysoftware'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function getSingleRpd(req, res, next){
    var nameRpd = req.params.name;
    db.query('Select * from rpd where name = $1', nameRpd)
        .then(function(){
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Get ONE RPD'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}
function getSingleTheme(req, res, next){
    var name = req.params.name;
    var idrpd = req.params.idrpd;

    db.query('Select * from theme where name = $1 and rpd = $2', [name, idrpd])
        .then(function(){
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Get ONE Theme'
                });
        })
        .catch(function (err) {
            return next(err);
        });
}

function updateCatSoft(req, res, next) {
    db.query('update categorysoftware set name = $1, comment = $2 where id = $3; Commit;',
        [req.query.name, req.query.comment, parseInt(req.params.id)])
        .then(function(){
            res.status(200)
                .json({
                    status: 'success',
                    message: 'Updated one categorysoftware'
                });
        })
        .catch(function(err){
            return next(err);
        });
}

function removeCatSoft(req, res, next){
    var catSoftID = parseInt(req.params.id);
    db.result('delete from categorysoftware where id = $1', catSoftID)
        .then(function (result){
            res.status(200)
                .json({
                    status: 'success',
                    message: `Removed ${result.rowCount} categorysoftware`
                });
        })
        .catch(function(err){
            return next(err);
        });
}

module.exports = {
    getAllCatSoft,
    getSingleCatSoft,
    createCatSoft,
    updateCatSoft,
    removeCatSoft,
    getAllSoft,
    getAllLab,
    getAllEquip,
    createSoft,
    createLab,
    createEquip,
    createRpd,
    createRpdTemp,
    getAllRpd,
    getSingleRpd,
    createTheme,
    getSingleTheme
};