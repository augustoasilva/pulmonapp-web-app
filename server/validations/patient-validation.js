// VALIDATION
const Joi = require('@hapi/joi')

// Post Validation
exports.post = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .max(255)
      .required(),
    middleName: Joi.string()
      .max(255)
      .required(),
    lastName: Joi.string()
      .max(255)
      .required(),
    rg: Joi.string().required(),
    cpf: Joi.string().required(),
    weight: Joi.string().required(),
    height: Joi.string().required(),
    sex: Joi.string().required(),
    tidalVolumePerMass: Joi.string().required(),
    tidalVolume: Joi.number().required(),
    location: Joi.object({
      city: Joi.string()
        .max(255)
        .required(),
      state: Joi.string()
        .min(2)
        .max(255)
        .required()
    }),
    hospital: Joi.string().required(),
    assignedBy: Joi.string().required()
  })

  return schema.validate(data)
}

// Put Validation
exports.put = (data) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .max(255)
      .required(),
    middleName: Joi.string()
      .max(255)
      .required(),
    lastName: Joi.string()
      .max(255)
      .required(),
    rg: Joi.string().required(),
    cpf: Joi.string().required(),
    weight: Joi.string().required(),
    height: Joi.string().required(),
    sex: Joi.string().required(),
    tidalVolumePerMass: Joi.string().required(),
    tidalVolume: Joi.number().required(),
    location: Joi.object({
      city: Joi.string()
        .max(255)
        .required(),
      state: Joi.string()
        .min(2)
        .max(255)
        .required()
    }),
    hospital: Joi.string().required(),
    assignedBy: Joi.string().required()
  })

  return schema.validate(data)
}

// Delete Validation
exports.delete = (data) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })

  return schema.validate(data)
}

// Discharge Validation
exports.discharge = (data) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })

  return schema.validate(data)
}
