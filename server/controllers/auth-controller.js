const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const consola = require('consola')
const User = require('../models/User')
const TokenList = require('../models/TokenList')
const authValidation = require('../validations/auth-validation')

exports.login = async (req, res) => {
  // DATA VALIDATION
  const { error } = authValidation.login(req.body)
  if (error)
    return res.status(400).send({
      message: {
        type: 'error',
        code: 'ERR-DATA-INVALID',
        text: error.details[0].message
      }
    })

  try {
    const user = await User.findOne({ email: req.body.email })

    // Checcking if user.password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword)
      return res.status(400).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-PASSWORD',
          text: 'Invalid password.'
        }
      })

    // Create and assign a jwt
    const accessToken = await jwt.sign(
      {
        sub: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        type: 'access'
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '12h'
      }
    )
    // eslint-disable-next-line no-console
    // console.log(user._id)
    // To-Do: New version of @nuxt/auth with refresh token
    // const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET, {
    //   expiresIn: '96h'
    // })

    return res.status(200).send({
      message: {
        type: 'success',
        text: 'The user has been logged in!',
        clientId: user._id
      },
      token: accessToken
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      consola.error({
        message: error,
        badge: true
      })
    }
    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-LOGIN-FAILED',
        text: 'There was a problem while logging in!'
      }
    })
  }
}

exports.logout = async (req, res) => {
  // DATA VALIDATION
  const { error } = authValidation.logout(req.body)
  if (error)
    return res.status(400).send({
      message: {
        type: 'error',
        code: 'ERR-DATA-INVALID',
        text: error.details[0].message
      }
    })
  let token = req.headers.authorization
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

    const user = await User.findOne({ _id: decoded.sub })

    if (user._id.toString() !== req.body.id) {
      return res.status(401).send({
        message: {
          type: 'error',
          code: 'ERR-NOT-AUTH-INVALID-TOKEN',
          text: 'The user does not have permission with this token.'
        }
      })
    }

    const indalidToken = new TokenList({
      token: decoded,
      type: decoded.type
    })

    await indalidToken.save()

    res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-INVALID-TOKEN',
        text: 'Token has been listed as invalid.'
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      consola.error({
        message: error,
        badge: true
      })
    }
    res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-NOT-INVALIDATED-TOKEN',
        text: 'There was a problem invaling your token to log the user out.'
      }
    })
  }
}
