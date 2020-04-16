const historicController = require('../controllers/historic-controller')
const tokenListed = require('../middlewares/token-listed')

/**
 * Historic routes
 * You can create, see, update and delete a historic's historic
 *
 * @param {Router} - express router
 */
module.exports = function(router) {
  router
    .route('/historics/:patientId')
    .all(tokenListed)
    .get(historicController.getHistoric)
  // .post(historicController.postHistoric)
  // .put(historicController.putHistoric)
  // .delete(historicController.delete)

  return router
}
