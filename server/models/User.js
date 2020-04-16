const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 255
  },
  middleName: {
    type: String,
    required: true,
    max: 255
  },
  lastName: {
    type: String,
    required: true,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  rg: {
    type: String,
    required: false,
    max: 255,
    min: 6
  },
  cpf: {
    type: String,
    required: false
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: 'false'
  },
  isConfirmed: {
    type: Boolean,
    required: false,
    default: 'false'
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  location: {
    city: {
      type: String,
      max: 255
    },
    state: {
      type: String,
      max: 255,
      min: 2
    },
    country: {
      type: String,
      max: 255,
      default: 'Brasil'
    }
  },
  hospital: {
    type: String
  },
  profession: {
    type: String,
    required: true,
    enum: ['Médico(a)', 'Fisioterapeuta(a)', 'Enfermeiro(a)', 'Farmacêutico(a)']
  },
  council: {
    type: String,
    required: true,
    enum: ['CRM', 'COREN', 'CREFITO', 'CRF']
  },
  registrationNumber: {
    type: Number,
    required: true
  },
  imagePath: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
