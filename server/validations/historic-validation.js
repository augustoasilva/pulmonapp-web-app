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
    rg: Joi.string()
      .min(6)
      .max(255)
      .required(),
    cpf: Joi.number()
      .min(11)
      .max(14)
      .required(),
    hospital: Joi.string().required(),
    council: Joi.string().required(),
    location: Joi.object({
      city: Joi.string()
        .max(255)
        .required(),
      state: Joi.string()
        .min(2)
        .max(255)
        .required()
    })
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
    rg: Joi.string()
      .min(6)
      .max(255)
      .required(),
    cpf: Joi.number()
      .min(11)
      .max(14)
      .required(),
    hospital: Joi.string().required(),
    council: Joi.string().required(),
    location: Joi.object({
      city: Joi.string()
        .max(255)
        .required(),
      state: Joi.string()
        .min(2)
        .max(255)
        .required()
    })
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
