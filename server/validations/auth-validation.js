// VALIDATION
const Joi = require('@hapi/joi')

// Login Validation
exports.login = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .max(255)
      .email(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required()
  })

  return schema.validate(data)
}

// Logout Validation
exports.logout = (data) => {
  const schema = Joi.object({
    id: Joi.string().required()
  })

  return schema.validate(data)
}
