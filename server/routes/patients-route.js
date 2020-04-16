const patientController = require('../controllers/patient-controller')
const tokenListed = require('../middlewares/token-listed')

/**
 * Patient routes
 * You can create, see, update and delete a patient and getting list of all patients
 *
 * @param {Router} - express router
 */
module.exports = function(router) {
  router
    .route('/patients')
    .get(tokenListed, patientController.getPatients)
    .post(patientController.postPatient)

  router
    .route('/patients/:id')
    .all(tokenListed)
    .get(patientController.getPatient)
    .put(patientController.putPatient)
    .delete(patientController.delPatient)

  router
    .route('/patients/:id/discharge')
    .put(tokenListed, patientController.dischargePatient)

  router
    .route('/patients/:id/family')
    .all(tokenListed)
    .get(patientController.getPatientFamily)
    .put(patientController.putPatientFamily)
    .delete(patientController.delPatientFamily)

  return router
}
