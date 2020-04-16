const usersController = require('../controllers/user-controller')
const tokenListed = require('../middlewares/token-listed')
// const verifyUser = require('../middleware/verifyUser')

/**
 * Users routes
 * You can create, see, update and delete a user using email, getting list of all users
 *
 * @param {Router} - express router
 */
module.exports = function(router) {
  router
    .route('/users')
    .get(tokenListed, usersController.getUsers)
    .post(usersController.postUser)
    .put(tokenListed, usersController.putUser)

  router
    .route('/users/:id')
    .all(tokenListed)
    .get(usersController.getUser)
    .delete(usersController.delUser)

  router
    .route('/users/change-password')
    .put([tokenListed], usersController.putUserPassowrd)

  router.route('/user/me').get(tokenListed, usersController.getMe)

  //  Uncomment - When @nuxt/auth v5 releases
  // router.route('/users/refresh')

  return router
}
