const bcrypt = require('bcrypt')
const consola = require('consola')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const userValidation = require('../validations/user-validation')

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    delete user.isAdmin

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-GOT-USERS',
        text: 'Invalid id string!'
      },
      user
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }

    if (error.name === 'CastError')
      return res.status(403).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-ID',
          text: 'Invalid id string!'
        }
      })

    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem executing the query!'
      }
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-GOT-USERS',
        text: 'Invalid id string!'
      },
      users
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }

    if (error.name === 'CastError')
      return res.status(403).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-ID',
          text: 'Invalid id string!'
        }
      })

    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem executing the query!'
      }
    })
  }
}

exports.postUser = async (req, res) => {
  // DATA VALIDATION
  const { error } = userValidation.post(req.body)

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    return res.status(422).send({
      message: {
        type: 'error',
        code: 'ERR-DATA-INVALID',
        text: error.details[0].message
      }
    })
  }

  // Checking if the user.email is already taken
  try {
    const user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.status(409).send({
        message: {
          type: 'error',
          code: 'ERR-EMAIL-EXIST',
          text: 'Email is already taken, please choose another one!'
        }
      })
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem to verify if the email is already taken!'
      }
    })
  }

  // Checking if the user.cpf is already taken
  try {
    const user = await User.findOne({ cpf: req.body.cpf })
    if (user) {
      return res.status(409).send({
        message: {
          type: 'error',
          code: 'ERR-EMAIL-EXIST',
          text: 'CPF is already taken!'
        }
      })
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem to verify if the CPF is already taken!'
      }
    })
  }

  // Checking if the user.rg is already taken
  try {
    const user = await User.findOne({ rg: req.body.rg })
    if (user) {
      return res.status(409).send({
        message: {
          type: 'error',
          code: 'ERR-RG-EXIST',
          text: 'RG is already taken!'
        }
      })
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem to verify if the RG is already taken!'
      }
    })
  }

  try {
    // Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    let council

    switch (req.body.profession) {
      case 'Médico(a)':
        council = 'CRM'
        break

      case 'Fisioterapeuta(a)':
        council = 'CREFITO'
        break

      case 'Enfermeiro(a)':
        council = 'COREN'
        break

      case 'Farmacêutico(a)':
        council = 'CRF'
        break

      default:
        res.status(500).send({
          message: {
            type: 'error',
            code: 'ERR-FINDING-COUNCIL',
            text: 'There was a problem to find your professional council!'
          }
        })
        break
    }

    const user = new User({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      rg: req.body.rg,
      cpf: req.body.cpf,
      email: req.body.email,
      password: hashPassword,
      profession: req.body.profession,
      registrationNumber: req.body.registrationNumber,
      council,
      location: {
        city: req.body.city,
        state: req.body.state
      },
      hospital: req.body.hospital
    })

    await user.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-USER-CREATED',
        text: 'User has been created.'
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-NOT-CREATED-USER',
        text: 'There was a problem to create the user!'
      }
    })
  }
}

exports.putUser = async (req, res) => {
  // DATA VALIDATION
  const { error } = userValidation.put(req.body)

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    return res.status(422).send({
      message: {
        type: 'error',
        code: 'ERR-DATA-INVALID',
        text: error.details[0].message
      }
    })
  }

  try {
    const user = await User.findById(req.params.id)

    user.firstName = req.body.firstName
    user.middleName = req.body.middleName
    user.lastName = req.body.lastName
    user.email = req.body.email
    user.location = {
      city: req.body.address.city,
      state: req.body.address.state,
      country: req.body.address.country
    }
    user.rg = req.body.rg
    user.cpf = req.body.cpf
    user.hopistal = req.body.hopistal
    user.profession = req.body.profession
    user.registrationNumber = req.body.registrationNumber
    user.council = req.body.council
    user.updatedAt = Date.now()

    user.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-USER-CREATED',
        text: 'User has been created!'
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    if (error.name === 'CastError')
      return res.status(403).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-ID',
          text: 'Invalid id string!'
        }
      })

    return res.status(404).send({
      message: {
        type: 'error',
        code: 'ERR-USER-NOT-FOUND',
        text: 'User not found on database!'
      }
    })
  }
}

exports.delUser = async (req, res) => {
  // DATA VALIDATION
  const { error } = userValidation.delete(req.query)

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    return res.status(422).send({
      message: {
        type: 'error',
        code: 'ERR-DATA-INVALID',
        text: error.details[0].message
      }
    })
  }

  try {
    await User.deleteOne({ _id: req.query.id })

    res.status(200).send('User deleted!')
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    if (error.name === 'CastError')
      return res.status(403).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-ID',
          text: 'Invalid id string!'
        }
      })

    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem to delete the user!'
      }
    })
  }
}

exports.putUserPassowrd = async (req, res) => {
  // DATA VALIDATION
  const { error } = userValidation.putPassword(req.body)

  if (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }
    return res.status(422).send({
      message: {
        type: 'error',
        code: 'ERR-DATA-INVALID',
        text: error.details[0].message
      }
    })
  }

  try {
    // Checking if the user._id is exists
    const user = await User.findById(req.params.id)
    if (!user)
      return res.status(404).send({
        message: {
          type: 'error',
          code: 'ERR-USER-NOT-FOUND',
          details: 'User not found on database.'
        }
      })

    if (
      req.body.password !== req.body.checkPassword &&
      req.body.newPassword !== req.body.checkNewPassword
    ) {
      return res.status(406).send({
        message: {
          type: 'error',
          code: 'ERR-PASS-NOT-MATCH',
          text: 'Error to check password and/or new password.'
        }
      })
    }

    // Checcking if user.passowrd is correct
    const samePassword = await bcrypt.compare(
      req.body.newPassword,
      user.password
    )
    if (samePassword)
      return res.status(406).send({
        message: {
          type: 'error',
          code: 'ERR-SAME-PASSWORD',
          text: 'The new password is the same as the old one.'
        }
      })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt)

    user.password = hashPassword
    user.updatedAt = Date.now()

    user.save()

    res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-PASS-UPDATED',
        text: 'User password has been updated.'
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      consola.error({
        message: error,
        badge: true
      })
    }

    if (error.name === 'CastError')
      return res.status(403).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-ID',
          text: 'Invalid id string!'
        }
      })

    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem executing the query!'
      }
    })
  }
}

exports.getMe = async (req, res) => {
  let token = req.headers.authorization
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length)
  }
  const decoded = await jwt.verify(token, process.env.TOKEN_SECRET)

  try {
    const user = await User.findById(decoded.sub)

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-GOT-USER-SELF',
        text: 'Got the authenticated user!'
      },
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        council: user.council,
        registrationNumber: user.registrationNumber,
        state: user.location.state,
        imagePath: user.imagePath,
        verified: user.isConfirmed
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'developemnt') {
      consola.error({
        message: error,
        badge: true
      })
    }

    if (error.name === 'CastError')
      return res.status(403).send({
        message: {
          type: 'error',
          code: 'ERR-INVALID-ID',
          text: 'Invalid id string!'
        }
      })

    return res.status(500).send({
      message: {
        type: 'error',
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem executing the query!'
      }
    })
  }
}
