const express = require('express');
const router = express.Router();

const db = require('../auth/queries.func');
//Category Software
router.get('/catsoft', db.getAllCatSoft);
router.get('/catsoft/:id', db.getSingleCatSoft);
router.post('/catsoft', db.createCatSoft);
router.put('/catsoft/:id', db.updateCatSoft);
router.delete('/catsoft/:id', db.removeCatSoft);
//Software
router.get('/soft', db.getAllSoft);
//router.get('/catsoft/:id', db.getSingleCatSoft);
router.post('/soft', db.createSoft);
//router.put('/catsoft/:id', db.updateCatSoft);
//router.delete('/catsoft/:id', db.removeCatSoft);
//Laboratory
router.get('/lab', db.getAllLab);
//router.get('/catsoft/:id', db.getSingleCatSoft);
router.post('/lab', db.createLab);
//router.put('/catsoft/:id', db.updateCatSoft);
//router.delete('/catsoft/:id', db.removeCatSoft);
//Equipment
router.get('/equip', db.getAllEquip);
//router.get('/catsoft/:id', db.getSingleCatSoft);
router.post('/equip', db.createEquip);
//router.put('/catsoft/:id', db.updateCatSoft);
//router.delete('/catsoft/:id', db.removeCatSoft);
//RPD
router.get('/rpd', db.getAllRpd);
router.get('/rpd/:name', db.getSingleRpd);
router.post('/rpd', db.createRpdTemp);
//router.put('/catsoft/:id', db.updateCatSoft);
//router.delete('/catsoft/:id', db.removeCatSoft);
//Theme
//router.get('/theme', db.getAllRpd);
router.get('/rpd/:name&:idrpd', db.getSingleTheme);
router.post('/rpd', db.createTheme);
//router.put('/catsoft/:id', db.updateCatSoft);
//router.delete('/catsoft/:id', db.removeCatSoft);


module.exports = router;