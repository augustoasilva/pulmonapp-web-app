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
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required(),
    confirmPassword: Joi.ref('password'),
    registrationNumber: Joi.number().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    profession: Joi.string().required(),
    rg: Joi.string().required(),
    cpf: Joi.string().required(),
    hospital: Joi.string()
  })

  return schema.validate(data)
}

// Put Validation
exports.put = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string()
      .max(255)
      .required(),
    middleName: Joi.string()
      .max(255)
      .required(),
    lastName: Joi.string()
      .max(255)
      .required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required(),
    confirmPassowrd: Joi.ref('password'),
    crm: Joi.number().required(),
    rg: Joi.string()
      .min(6)
      .max(255)
      .required(),
    cpf: Joi.number()
      .min(11)
      .max(14)
      .required(),
    hospital: Joi.string().required(),
    profession: Joi.string().required(),
    council: Joi.string().required(),
    location: Joi.object({
      city: Joi.string()
        .max(255)
        .required(),
      state: Joi.string()
        .min(2)
        .max(255)
        .required()
    }),
    registrationNumber: Joi.number().required()
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

// PutPassword Validation
exports.putPassword = (data) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required(),
    confirmPassowrd: Joi.ref('password'),
    newPassword: Joi.string()
      .min(6)
      .max(1024)
      .required(),
    confirmNewPassowrd: Joi.ref('newPassword')
  })

  return schema.validate(data)
}
