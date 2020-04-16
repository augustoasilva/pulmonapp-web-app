const consola = require('consola')
const moment = require('moment')
const Patient = require('../models/Patient')
const Historic = require('../models/Historic')
const patientValidation = require('../validations/patient-validation')
moment.locale('br')

exports.getPatients = async (req, res) => {
  try {
    const patientsList = await Patient.find()
    const patients = []
    patientsList.forEach((patient) => {
      const newPatient = {
        _id: patient._id,
        firstName: patient.firstName,
        middleName: patient.middleName,
        lastName: patient.lastName,
        rg: patient.rg,
        cpf: patient.cpf,
        weight: patient.weight,
        height: patient.height,
        tidalVolumePerMass: patient.tidalVolumePerMass,
        sex: patient.sex,
        tidalVolume: patient.tidalVolume,
        location: {
          city: patient.location.city,
          state: patient.location.state
        },
        hospital: patient.hospital,
        createdAt: moment(patient.createdAt).format('DD/MM/YYYY - HH:mm'),
        updatedAt: moment(patient.updatedAt).format('DD/MM/YYYY - HH:mm')
      }

      patients.push(newPatient)
    })

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-GOT-USERS',
        text: 'Invalid id string!'
      },
      patients
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

exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id })

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-GOT-USERS',
        text: 'Invalid id string!'
      },
      patient
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

exports.postPatient = async (req, res) => {
  // DATA VALIDATION
  const { error } = patientValidation.post(req.body)

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

  // Checking if the patient.cpf is already taken
  try {
    const patient = await Patient.findOne({ cpf: req.body.cpf })
    if (patient) {
      return res.status(409).send({
        message: {
          type: 'error',
          code: 'ERR-EMAIL-EXIST',
          text: 'CPF is already taken!'
        }
      })
    }
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
        text: 'There was a problem to verify if the CPF is already taken!'
      }
    })
  }

  // Checking if the patient.rg is already taken
  try {
    const patient = await Patient.findOne({ rg: req.body.rg })
    if (patient) {
      return res.status(409).send({
        message: {
          type: 'error',
          code: 'ERR-RG-EXIST',
          text: 'RG is already taken!'
        }
      })
    }
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
        text: 'There was a problem to verify if the RG is already taken!'
      }
    })
  }

  // Creating patient and historic
  try {
    const patient = new Patient({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      rg: req.body.rg,
      cpf: req.body.cpf,
      weight: parseInt(req.body.weight),
      height: parseInt(req.body.height),
      tidalVolumePerMass: parseInt(req.body.tidalVolumePerMass),
      sex: req.body.sex,
      tidalVolume: parseInt(req.body.tidalVolume),
      location: {
        city: req.body.location.city,
        state: req.body.location.state
      },
      hospital: req.body.hospital
    })

    const historic = new Historic({
      patient: patient._id,
      assignedBy: req.body.assignedBy,
      type: 'ADMITTED',
      description: 'Paciente deu entrada/início ao tratamento.'
    })

    await patient.save()

    await historic.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-PATIENT-REGISTERED',
        text: 'Patient has been registered.'
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
        code: 'ERR-NOT-REGISTERED-PATIENT',
        text: 'There was a problem to create the patient!'
      }
    })
  }
}

exports.putPatient = async (req, res) => {
  // DATA VALIDATION
  const { error } = patientValidation.put(req.body)

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
    let historic
    const patient = await Patient.findById(req.params.id)

    patient.firstName = req.body.firstName
    patient.middleName = req.body.middleName
    patient.lastName = req.body.lastName
    patient.rg = req.body.rg
    patient.cpf = req.body.cpf
    patient.location = {
      city: req.body.location.city,
      state: req.body.location.state
    }
    patient.hospital = req.body.hospital
    patient.updatedAt = Date.now()

    if (parseInt(req.body.tidalVolume) !== patient.tidalVolume) {
      patient.weight = parseInt(req.body.weight)
      patient.height = parseInt(req.body.height)
      patient.tidalVolumePerMass = parseInt(req.body.tidalVolumePerMass)
      patient.sex = req.body.sex
      patient.tidalVolume = parseInt(req.body.tidalVolume)

      historic = new Historic({
        patient: patient._id,
        assignedBy: req.body.assignedBy,
        type: 'CHANGED-TIDAL-VOLUME',
        description: `Foi alterado o volume corrente do paciente para: ${patient.tidalVolume}ml.`
      })
    } else {
      historic = new Historic({
        patient: patient._id,
        assignedBy: req.body.assignedBy,
        type: 'UPDATED-PATIENT',
        description: 'Atualização dos dados do paciente.'
      })
    }

    await patient.save()

    await historic.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-PATIENT-UPDATED',
        text: 'Patient has been updated!'
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
        code: 'ERR-PATIENT-NOT-FOUND',
        text: 'Patient not found on database!'
      }
    })
  }
}

exports.delPatient = async (req, res) => {
  // DATA VALIDATION
  const { error } = patientValidation.delete(req.params)

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
    await Patient.deleteOne({ _id: req.params.id })

    res.status(200).send('Patient deleted!')
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
        text: 'There was a problem to delete the patient!'
      }
    })
  }
}

exports.dischargePatient = async (req, res) => {
  // DATA VALIDATION
  const { error } = patientValidation.discharge(req.params)

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
    const patient = await Patient.findById(req.params.id)
    const historic = new Historic({
      patient: patient._id,
      assignedBy: req.body.assignedBy,
      type: 'DISCHARGED',
      description: 'Paciente teva alta.'
    })

    patient.isDischarged = true
    patient.dischargedAt = Date.now()
    patient.updatedAt = Date.now()

    await patient.save()

    await historic.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-PATIENT-UPDATED',
        text: 'Patient has been updated!'
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
        code: 'ERR-PATIENT-NOT-FOUND',
        text: 'Patient not found on database!'
      }
    })
  }
}

exports.getPatientFamily = async (req, res) => {
  try {
    const patient = await Patient.findOne({ _id: req.params.id })

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-GOT-USERS',
        text: 'Invalid id string!'
      },
      familyMembers: patient.family
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

exports.putPatientFamily = async (req, res) => {
  // DATA VALIDATION
  // const { error } = patientValidation.put(req.body)

  // if (error) {
  //   if (process.env.NODE_ENV !== 'production') {
  //     consola.error({
  //       message: error,
  //       badge: true
  //     })
  //   }
  //   return res.status(422).send({
  //     message: {
  //       type: 'error',
  //       code: 'ERR-DATA-INVALID',
  //       text: error.details[0].message
  //     }
  //   })
  // }

  try {
    const patient = await Patient.findById(req.params.id)

    patient.family.push(req.body.familyMember)
    patient.updatedAt = Date.now()

    const historic = new Historic({
      patient: patient._id,
      assignedBy: req.body.assignedBy,
      type: 'OTHER',
      description: `Foi adicionado um parente para contato ao paciente ${patient.firstName} ${patient.middleName} ${patient.lastName}.`
    })

    await patient.save()

    await historic.save()

    return res.status(200).send({
      message: {
        type: 'success',
        code: 'SCC-PATIENT-UPDATED',
        text: 'Patient has been updated!'
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
        code: 'ERR-PATIENT-NOT-FOUND',
        text: 'Patient not found on database!'
      }
    })
  }
}

exports.delPatientFamily = async (req, res) => {
  // DATA VALIDATION
  const { error } = patientValidation.delete(req.params)

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
    const patient = await Patient.findById(req.params.id)

    const familyFiltered = patient.family.filter((familyMember) => {
      return familyMember !== req.query.familyMember
    })

    patient.family = familyFiltered
    patient.updatedAt = Date.now()

    const historic = new Historic({
      patient: patient._id,
      assignedBy: req.body.professional,
      type: 'OTHER',
      description: `Foi removido um parente ao paciente ${patient.firstName} ${patient.lastName}.`
    })

    await patient.save()

    await historic.save()

    res.status(200).send('Patient deleted!')
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
        text: 'There was a problem to delete the patient!'
      }
    })
  }
}
