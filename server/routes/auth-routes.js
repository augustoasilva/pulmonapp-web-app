const authController = require('../controllers/auth-controller')

/**
 * Auth routes
 * You can login and logout, and soon refresh the token with the new @nuxt/auth
 *
 * @param {Router} - express router
 */
module.exports = function(router) {
  router.route('/auth/login').post(authController.login)

  router.route('/auth/logout').post(authController.logout)

  //  Uncomment - When @nuxt/auth v5 releases
  // router.route('/users/refresh')

  return router
}
