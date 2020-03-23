var express = require('express');
var router = express.Router();

var disease_controller = require('../controllers/disease.controller');

// Main
router.get('/', disease_controller.mainPage);
router.post('/search', disease_controller.search_post);
router.post('/select', disease_controller.select_post);
// Admin
router.get('/admin', disease_controller.adminPage);
router.get('/:id/treatments', disease_controller.adminPage3);
router.get('/:id/syndromes', disease_controller.adminPage2);
router.get('/:id/update', disease_controller.updatePage);
router.get('/:id/:syid/syndromes-update', disease_controller.updatePage2);
router.get('/:id/:tid/treatments-update', disease_controller.updatePage3);
// Diseases
router.post('/add-disease', disease_controller.disease_add); 
router.post('/:id/update', disease_controller.disease_update);                    // put
router.get('/:id/delete', disease_controller.disease_delete);                     // delete
// Syndromes
router.post('/:id/add-syndrome', disease_controller.syndrome_add);                // put
router.post('/:id/:syid/syndromes-update', disease_controller.syndrome_update);   // put
router.get('/:id/:syid/syndromes-delete', disease_controller.syndrome_delete);    // put
// Treatments
router.post('/:id/add-treatment', disease_controller.treatment_add);              // put
router.post('/:id/:tid/treatments-update', disease_controller.treatment_update);  // put
router.get('/:id/:tid/treatments-delete', disease_controller.treatment_delete);   // put
router.get('/alldata', disease_controller.alldata);

module.exports = router;