const consola = require('consola')
const moment = require('moment')
const Historic = require('../models/Historic')
// const historicValidation = require('../validations/historic-validation')
moment.locale('br')

exports.getHistoric = async (req, res) => {
  try {
    const historicsList = await Historic.find({ patient: req.params.patientId })
      .populate('patient')
      .populate('assignedBy')

    const historics = []

    historicsList.forEach((historic) => {
      const newHistoric = {
        patient: historic.patient,
        assignedBy: historic.assignedBy,
        type: historic.type,
        description: historic.description,
        createdAt: moment(historic.createdAt).format('DD/MM/YYYY - HH:mm')
      }
      historics.push(newHistoric)
    })

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-GOT-HISTORICS',
        text: 'Invalid id string!'
      },
      historics
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
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

/* exports.postHistoric = async (req, res) => {
  // DATA VALIDATION
  const { error } = historicValidation.post(req.body)

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
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

  // Checking if the historic.email is already taken
  try {
    await Historic.findOne({ email: req.body.email })
    return res.status(409).send({
      message: {
        type: 'error',
        code: 'ERR-EMAIL-EXIST',
        text: 'Email is already taken, please choose another one!'
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
        code: 'ERR-QUERY-NOT-EXECUTED',
        text: 'There was a problem to verify if the email is already taken!'
      }
    })
  }

  try {
    const historic = new Historic({
      name: req.body.name,
      surname: req.body.surname,
      historicname: req.body.historicname,
      email: req.body.email,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        neighborhood: req.body.address.neighborhood,
        city: req.body.address.city,
        state: req.body.address.state,
        country: req.body.address.country
      },
      isAdmin: 'false'
    })

    await historic.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-HISTORIC-CREATED',
        text: 'Historic has been created.'
      }
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
        code: 'ERR-NOT-CREATED-HISTORIC',
        text: 'There was a problem to create the historic!'
      }
    })
  }
} */

/* exports.putHistoric = async (req, res) => {
  // DATA VALIDATION
  const { error } = historicValidation.put(req.body)

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
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
    const historic = await Historic.findById(req.params.id)

    historic.name = req.body.name
    historic.surname = req.body.surname
    historic.historicname = req.body.historicname
    historic.email = req.body.email
    historic.address = {
      street: req.body.address.street,
      number: req.body.address.number,
      neighborhood: req.body.address.neighborhood,
      city: req.body.address.city,
      state: req.body.address.state,
      country: req.body.address.country,
      zip: req.body.address.zip
    }
    historic.updatedAt = Date.now()

    historic.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-HISTORIC-CREATED',
        text: 'Historic has been created!'
      }
    })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
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
        code: 'ERR-HISTORIC-NOT-FOUND',
        text: 'Historic not found on database!'
      }
    })
  }
} */

/* exports.delHistoric = async (req, res) => {
  // DATA VALIDATION
  const { error } = historicValidation.delete(req.query)

  if (error) {
    if (process.env.NODE_ENV !== 'production') {
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
    await Historic.deleteOne({ _id: req.query.id })

    res.status(200).send('Historic deleted!')
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
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
        text: 'There was a problem to delete the historic!'
      }
    })
  }
} */
