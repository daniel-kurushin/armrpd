var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

var config = {
    userName: 'etf_department',
    password: 'EOyZj2Z6BF',
    server: 'ias-db.local.pstu.ru'
};

var connection = new Connection(config);

/*Statements BEGIN*/
var queryGD = "select t1.\"Наименование\" as 'Группа', "+
    "t6.\"Наименование\" as 'Дисциплина' "+
    "from \"УчебнаяГруппа\" t1 "+
    "left join \"СтруктурноеПодразделение\" t2 on t2.primaryKey = t1.\"Кафедра\""+
    "left join \"УчебныйГод\" t3 on t3.primaryKey = t1.\"УчебныйГод\" "+
    "left join \"РабочийУчебныйПлан\" t4 on t4.primaryKey = t1.\"РабочийУчебныйПлан\" "+
    "left join \"ДисциплинаРУП\" t5 on t4.primaryKey = t5.\"РабочийУчебныйПлан\" "+
    "join \"Дисциплина\" t6 on t6.primaryKey = t5.\"Дисциплина\" "+
    "where t2.primaryKey = '951AE706-1643-4011-9EDA-C32EB1282D61' and YEAR(t3.\"ДатаНачала\") > 2013 "+
    "and t1.\"Наименование\" not like '%а' "+
    "and t1.\"Наименование\" not like 'ИОПС%' "+
    "order by 1, 2";
/*Statement END*/
function getData(stateSQL, req, res, callback) {
    var result = [];
    request = new Request(stateSQL, function (err, rowCount, rows) {
        if (err) {
            console.log(err);
            callback(null, err);
        } else {
            console.log(rowCount + ' rows');
            callback(null, result);
        }
    });

    request.on('row', function (columns) {
        var dataset = {};
        columns.forEach(function (column) {
            dataset[column.metadata.colName] = column.value;
        });
        result.push(dataset);
    });
    request.addParameter('idDep', TYPES.VarChar);
    connection.execSql(request);
};
//Функция получения данных пророектора по учебной работе
function getProrektor(req, res) {
    var queryProrektor = "SELECT t4.\"ПолноеНаименование\" as \"Должность\", t5.\"Наименование\" as \"УченаяСтепень\", t6.\"Актуально\", t6.\"Наименование\" as \"УченоеЗвание\", t1.\"Фамилия\", t1.\"Имя\", t1.\"Отчество\" "+
        "from Личность t1 "+
        "left join Сотрудник t2 on t2.\"Личность\" = t1.primaryKey "+
        "left join ШтатнаяЕдиница t3 on t3.primaryKey = t2.\"ШтатнаяЕдиница\" "+
        "left join Должность t4 on t4.primaryKey = t3.\"Должность\" "+
        "left join УченаяСтепень t5 on t5.primaryKey = t1.\"УченаяСтепень\" "+
        "left join УченоеЗвание t6 on t6.primaryKey = t1.\"УченоеЗвание\" "+
        "where t4.\"ПолноеНаименование\" = \'Проректор по учебной работе\' "+
        "and t4.\"Актуально\" = 1  and t2.\"ДатаУвольнения\" > SYSDATETIME() ";

    getData(queryProrektor, req, res, function (err, rows) {
        if (err) {
            res.error(err);
        } else {
            res.json(rows);
        }
    });
}
//Функция получения списка групп и дисциплин
function getGroupDiscipline(req, res) {
    getData(queryGD, req, res, function (err, rows) {
        var newRows = transformArr(rows);
        res.json(newRows);
    });
}
// Функция группировки дисциплин по группам
function transformArr(orig) {
    var newArr = [],
        groups = {},
        newItem, i, j, cur;
    for (i = 0, j = orig.length; i < j; i++) {
        cur = orig[i];
        if (!(cur.Группа in groups)) {
            groups[cur.Группа] = {Группа: cur.Группа, Дисциплины: []};
            newArr.push(groups[cur.Группа]);
        }
        groups[cur.Группа].Дисциплины.push(cur.Дисциплина);
    }
    return newArr;
}
//Функция получения данных пользователя
function getUser(req, res) {
    var queryUser =
        "SELECT "+
        "Л.Фамилия, Л.Имя, " +
        "ISNULL(Л.Отчество, '') Отчество, "+
        "Д.Наименование Должность, "+
        "ISNULL(УЗ.Наименование, '') Звание, "+
        "ISNULL(УС.Наименование, '') Степень, "+
        "СП.Наименование Кафедра, "+
        "СП.primaryKey Ид_кафедры, "+
        "CASE WHEN С.Совместитель = 1 THEN 'Совместитель' ELSE 'Штатный' END 'Штат' "+
        "FROM dbo.ПреподавательКафедры ПК "+
        "JOIN dbo.Сотрудник С ON С.primaryKey = ПК.Сотрудник "+
        "JOIN dbo.Личность Л ON Л.primaryKey = С.Личность "+
        "LEFT JOIN dbo.СтруктурноеПодразделение СП ON СП.primaryKey = ПК.Кафедра "+
        "LEFT JOIN dbo.ШтатнаяЕдиница ON ШтатнаяЕдиница.primaryKey = С.ШтатнаяЕдиница "+
        "LEFT JOIN dbo.Должность Д ON Д.primaryKey = ШтатнаяЕдиница.Должность "+
        "LEFT JOIN dbo.УченоеЗвание УЗ ON УЗ.primaryKey = Л.УченоеЗвание "+
        "LEFT JOIN dbo.УченаяСтепень УС ON УС.primaryKey = Л.УченаяСтепень "+
        "WHERE Л.primaryKey ='6E83AC4D-4221-47EA-85D8-58D56BEF486E'--ID FRA "+
        "AND ПК.Актуально = 1 ";

    getData(queryUser,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция получения списка кафедр
function getListChair(req, res) {
    var queryUser =
        "SELECT "+
        "t1.Наименование + ' - ' + t1.ПолноеНаименование as Fullname, " +
        "t1.ПолноеНаименование as Name, " +
        "t1.primaryKey as id " +
        "FROM СтруктурноеПодразделение t1 " +
        "WHERE t1.ПолноеНаименование like '%кафедра%' " +
        "AND t1.Актуально = 1 " +
        "order by 1";

    getData(queryUser,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция получения списка групп по кафедре
function getGroups(req, res) {
    var idDep = req.params.idDep;
    var query = "select  t1.Наименование as Группа, "+
        "t1.primaryKey as ИД_группы "+
        "from УчебнаяГруппа t1 "+
        "left join СтруктурноеПодразделение t2 on t2.primaryKey = t1.Кафедра "+
        "left join УчебныйГод t3 on t3.primaryKey = t1.УчебныйГод "+
        "where t2.primaryKey = '"+idDep+"' "+
        "and YEAR(t3.ДатаНачала) > 2013 "+
        "and t1.Наименование not like '%а' "+
        "and t1.Наименование not like 'ИОПС%' "+
        "order by 1, 2";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция получения списка дисциплин по группе
function getDisciplines(req, res) {
    var idGroup = req.params.idGroup;
    var query = "select t4.Наименование as Дисциплина, "+
        "t4.primaryKey as ИД_дисциплины, "+
        "from УчебнаяГруппа t1 "+
        "left join РабочийУчебныйПлан t2 on t2.primaryKey = t1.РабочийУчебныйПлан "+
        "left join ДисциплинаРУП t3 on t2.primaryKey = t3.РабочийУчебныйПлан "+
        "join Дисциплина t4 on t4.primaryKey = t3.Дисциплина "+
        "where t1.primaryKey = '"+idGroup+"' "+
        "order by 1, 2";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}
function getTitul(req, res) {
    var idDiscip = req.params.idDiscip;
    var idDep = req.params.idDep;
    var idRUP = req.params.idRUP;
    var query = "select t9.ПолноеНаименование Факультет, t2.ПолноеНаименование Кафедра, " +
        "t10.НовыйШифр ШифрНаправления, t10.ПолноеНаименование Направление, " +
        "t5.ПолноеНаименование Профиль, t8.Наименование Квалификация, "+
        "t7.ПолноеНаименование ФормаОбучения, t3.ВсегоЧасов Часов, (t3.ВсегоЧасов/t3.ЧасовВЗЕТ) Кредитов, " +
        "t10.primaryKey ИД_направления "+
        "from РабочийУчебныйПлан t1 "+
        "join СтруктурноеПодразделение t2 on t1.Кафедра = t2.primaryKey "+
        "join СтруктурноеПодразделение t9 on t9.primaryKey = t2.Иерархия "+
        "join ДисциплинаРУП t3 on t1.primaryKey = t3.РабочийУчебныйПлан "+
        "left join Дисциплина t4 on t3.Дисциплина = t4.primaryKey "+
        "left join Специальность t5 on t1.Специальность = t5.primaryKey "+
        "join Специальность t10 on t10.primaryKey = t5.Иерархия "+
        "left join СпециальноеЗвание t6 on t1.СпециальноеЗвание = t6.primaryKey "+
        "left join ФормаОбучения t7 on t1.ФормаОбучения = t7.primaryKey "+
        "left join Квалификация t8 on t1.Квалификация = t8.primaryKey "+
        "where t4.primaryKey = '"+idDiscip+"' "+
        "and t2.primaryKey = '"+idDep+"' "+
        "and t1.primaryKey = '"+idRUP+"'";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция возвращает часы по видам деятельности с курсом и семестром!!!
function getHours(req, res) {
    var idDiscip = req.params.idDiscip;
    var idRUP = req.params.idRUP;
    var query = "select t6.Номер Курс, t5.Номер Семестр, t1.КоличествоЧасов, t4.ПолноеНаименование ВидУчебнойДеятельности "+
        "from УчебнаяНагрузкаДисциплиныРУП t1 "+
        "join ВидУчебнойДеятельности t4 on t4.primaryKey = t1.ВидУчебнойДеятельности "+
        "join УчебныйПериод t5 on t5.primaryKey = t1.Семестр "+
        "join УчебныйПериод t6 on t6.primaryKey = t5.Иерархия "+
        "join ДисциплинаРУП t2 on t2.primaryKey = t1.ДисциплинаРУП "+
        "join РабочийУчебныйПлан t7 on t7.primarykey = t2.РабочийУчебныйПлан "+
        "left join Дисциплина t3 on t2.Дисциплина = t3.primaryKey "+
        "where t3.primaryKey = '"+idDiscip+"' "+
        "and t7.primaryKey = '"+idRUP+"'"+
        "order by 2 ";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}

//Функция возвращает компетенции дисциплины. Запрос нужно упростить. Написан на скорую руку!!!
function getDocs(req, res) {
    var idRUP = req.params.idRUP;
    var idDiscip = req.params.idDiscip;
    var idNapr = req.params.idNapr;
    var query = "select t5.КодКомпетенции, t5.Наименование "+
        "from ДисциплинаФГОС t1 "+
        "right join Дисциплина t2 on t2.primaryKey = t1.Дисциплина "+
        "join ФГОС t3 on t3.primaryKey = t1.ФГОС "+
        "join КомпетенцияВыпускникаФГОС t5 on t5.ФГОС = t3.primaryKey "+
        "where 1=1 "+
        "and t2.primaryKey = '"+idDiscip+"' "+
        "and t3.ДатаПриказаУтвержденияФГОС = (select max(t3.ДатаПриказаУтвержденияФГОС) "+
        "from ФГОС t3 "+
        "join Специальность t4 on t4.primaryKey = t3.Направление "+
        "where t4.primaryKey = '"+idNapr+"' "+
        ") "+
        "and t5.КодКомпетенции in (select t5.КраткоеНаименование "+
        "from Дисциплина t1 "+
        "join ДисциплинаРУП t2 on t2.Дисциплина = t1.primaryKey "+
        "join ДисциплинаБУП t3 on t3.primaryKey = t2.ДисциплинаБУП "+
        "join КомпетенцияДисциплиныБУП t4 on t3.primaryKey = t4.ДисциплинаБУП "+
        "join КомпетенцияВыпускникаБУП t5 on  t4.Компетенция = t5.primaryKey "+
        "join КомпетенцияВыпускникаФГОС t6 on t5.КраткоеНаименование = t6.КодКомпетенции "+
        "join ДисциплинаФГОС t7 on t1.primaryKey = t7.Дисциплина "+
        "join ФГОС t8 on t7.ФГОС = t8.primaryKey "+
        "join Специальность t9 on t9.primaryKey = t8.Направление "+
        "where t2.РабочийУчебныйПлан = '"+idRUP+"' "+
        "and t1.primaryKey = '"+idDiscip+"' "+
        "and t9.primaryKey = '"+idNapr+"' "+
        ")";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция возвращает ВидУчебногоЦикла и ЧастьУчебногоЦикла дисциплины!!!
function getUchVidaChasty(req, res) {
    var idRUP = req.params.idRUP;
    var idDiscip = req.params.idDiscip;
    var query = "SELECT t3.Наименование, t4.ПолноеНаименование, t5.Комментарий "+
        "FROM РабочийУчебныйПлан t1 "+
        "join ДисциплинаРУП t2 on t2.РабочийУчебныйПлан = t1.primaryKey "+
        "join Дисциплина t3 on t2.Дисциплина = t3.primaryKey "+
        "left join ВидУчебногоЦикла t4 on t2.ВидУчебногоЦикла = t4.primaryKey "+
        "left join ЧастьУчебногоЦикла t5 on t2.ЧастьУчебногоЦикла = t5.primaryKey "+
        "where t1.primaryKey = '"+idRUP+"' "+
        "and t3.primaryKey = '"+idDiscip+"';";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция возвращает компетенции по дисциплине
function getСompetences(req, res) {
    var idDep = req.params.idDep;
    var idDiscip = req.params.idDiscip;
    var idGroup = req.params.idGroup;
    var query = "select КВ.КраткоеНаименование shortName, КВ.Наименование fullName "+
        "From УчебнаяГруппа УГр "+
        "join СтруктурноеПодразделение СП on СП.primaryKey = УГр.Кафедра "+
        "left join РабочийУчебныйПлан РУП on РУП.primaryKey = УГр.РабочийУчебныйПлан "+
        "join ДисциплинаРУП ДРУП on ДРУП.РабочийУчебныйПлан = РУП.primaryKey "+
        "join СтруктурноеПодразделение СПД on СПД.primaryKey = ДРУП.Кафедра "+
        "left join Дисциплина Д on Д.primaryKey = ДРУП.Дисциплина "+
        "left join ДисциплинаБУП ДБУП on ДБУП.primaryKey = ДРУП.ДисциплинаБУП "+
        "join КомпетенцияДисциплиныБУП КД on КД.ДисциплинаБУП = ДБУП.primaryKey "+
        "join КомпетенцияВыпускникаБУП КВ on КВ.primaryKey = КД.Компетенция "+
        "where УГр.Кафедра = '"+idDep+"' "+
        "and УГр.Актуально = 1 "+
        "and ДРУП.Кафедра = '"+idDep+"' "+
        "and УГр.primarykey = '"+idGroup+"' "+
        "and Д.primaryKey = '"+idDiscip+"' "+
        "order by 1;";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция получения Списка дисциплин, Семестр, Компетенция
function getDisciplinePeriodCompetence(req, res) {
    var idRUP = req.params.idRUP;
    var query = "select DISTINCT t3.Наименование Дисциплина, t5.Номер Семестр, КВ.КраткоеНаименование Компетенция "+
        "from УчебнаяНагрузкаДисциплиныРУП t1 "+
        "join УчебныйПериод t5 on t5.primaryKey = t1.Семестр "+
        "join ДисциплинаРУП t2 on t2.primaryKey = t1.ДисциплинаРУП "+
        "left join ДисциплинаБУП ДБУП on ДБУП.primaryKey = t2.ДисциплинаБУП "+
        "join КомпетенцияДисциплиныБУП КД on КД.ДисциплинаБУП = ДБУП.primaryKey "+
        "join КомпетенцияВыпускникаБУП КВ on КВ.primaryKey = КД.Компетенция "+
        "join РабочийУчебныйПлан t7 on t7.primarykey = t2.РабочийУчебныйПлан "+
        "left join Дисциплина t3 on t2.Дисциплина = t3.primaryKey "+
        "where t7.primaryKey = '"+idRUP+"';";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}
//Функция получения списка: Направление, профиль, формаОбучения, РУП, датаУтвРУП, ИД_РУП, Группа, Дисциплина, ИД_дисциплины
function getInfoChair(req, res) {
    var idDep = req.params.idDep;
    var query = "select t7.полноенаименование направление, t7.primarykey ИД_направления, t6.полноенаименование профиль, t6.primarykey ИД_профиля, t5.полноенаименование формаОбучения, "+
        "t2.полноеимяплана РУП, t2.датаутверждения датаутвРУП, t2.primarykey ИД_РУП, t1.наименование Группа, t1.primarykey ИД_группы, t4.Наименование as Дисциплина, "+
        "t4.primaryKey as ИД_дисциплины "+
        "from УчебнаяГруппа t1 "+
        "left join РабочийУчебныйПлан t2 on t2.primaryKey = t1.РабочийУчебныйПлан "+
        "left join ДисциплинаРУП t3 on t2.primaryKey = t3.РабочийУчебныйПлан "+
        "join Дисциплина t4 on t4.primaryKey = t3.Дисциплина "+
        "left join ФормаОбучения t5 on t5.primarykey = t1.формаобучения "+
        "left join Специальность t6 on t6.primarykey = t1.специальность "+
        "join Специальность t7 on t7.primarykey = t6.новаяИерархия "+
        "where t1.primaryKey in ( "+
        "    select  t1.primaryKey as ИД_группы "+
        "from УчебнаяГруппа t1 "+
        "left join СтруктурноеПодразделение t2 on t2.primaryKey = t1.Кафедра "+
        "left join УчебныйГод t3 on t3.primaryKey = t1.УчебныйГод "+
        "where t2.primaryKey = '"+idDep+"' "+
        "and YEAR(t3.ДатаНачала) > 2013 "+
        "and t1.Наименование not like '%а' "+
        "and t1.Наименование not like 'ИОПС%')";
    getData(query,req,res,function (err, rows) {
        res.json(rows);
    });
}

module.exports = {
    getProrektor,
    getGroupDiscipline,
    getUser,
    getListChair,
    getGroups,
    getDisciplines,
    getTitul,
    getHours,
    getDocs,
    getСompetences,
    getUchVidaChasty,
    getDisciplinePeriodCompetence,
    getInfoChair
};