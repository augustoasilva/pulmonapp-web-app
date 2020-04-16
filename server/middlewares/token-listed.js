// const consola = require('consola')
const jwt = require('jsonwebtoken')
const TokenList = require('../models/TokenList')

module.exports = async (req, res, next) => {
  let token = req.headers.authorization
  let decoded

  if (!token) {
    return res.status(404).send({
      message: {
        type: 'error',
        code: 'ERR-NO-TOKEN',
        text: 'The client has not send the auth token.'
      }
    })
  }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }

  try {
    decoded = jwt.verify(token, process.env.TOKEN_SECRET)
  } catch (error) {
    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-TOKEN-UNTRUSTY',
        text: 'There is a problem with the token'
      }
    })
  }

  try {
    const tokenListed = await TokenList.findOne({ token: decoded })

    if (tokenListed.token) {
      return res.status(400).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-TOKEN',
          text: 'The token is invalid.'
        }
      })
    }
  } catch (error) {
    next()
  }
}
