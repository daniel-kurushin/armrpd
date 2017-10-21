const express = require('express');
const router = express.Router();

const dbIAS = require("../auth/queriesIAS.func");

router.get('/user', dbIAS.getUser);
router.get('/chairs', dbIAS.getListChair);
router.get('/prorektor', dbIAS.getProrektor);
router.get('/getgroups/:idDep', dbIAS.getGroups);
router.get('/getdiscipline/:idGroup', dbIAS.getDisciplines);
router.get('/gettitul/:idDiscip&:idDep&:idRUP', dbIAS.getTitul);// Params ID: Discipline, Department, RUP
router.get('/gethours/:idDiscip&:idRUP', dbIAS.getHours);// Params ID: Discipline, RUP
router.get('/getdocs/:idRUP', dbIAS.getDocs);// Params ID: RUP
router.get('/getcompetences/:idDiscip&:idGroup&:idDep', dbIAS.getСompetences);// Params ID: ИД_дисциплины, ИД_направления(Титул), ИД_РУП
router.get('/getgetuchvidachasty/:idDiscip&:idRUP', dbIAS.getUchVidaChasty);// Params ID: ИД_дисциплины, ИД_РУП
router.get('/getdisciplineperiodcompetence/:idRUP', dbIAS.getDisciplinePeriodCompetence);// Params ID: ИД_РУП
router.get('/getgroupdiscipline', dbIAS.getGroupDiscipline);
router.get('/getinfochair/:idDep', dbIAS.getInfoChair); //Params ID: ИД_кафедры
// router.get('/catsoft/:id', db.getSingleCatSoft);
// router.post('/catsoft', db.createCatSoft);
// router.put('/catsoft/:id', db.updateCatSoft);
// router.delete('/catsoft/:id', db.removeCatSoft);

module.exports = router;