const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
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
  rg: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  cpf: {
    type: String,
    required: true,
    max: 14,
    min: 11
  },
  weight: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  tidalVolumePerMass: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['Masculino', 'Feminino']
  },
  tidalVolume: {
    type: Number,
    required: true
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
  family: [
    {
      firstName: {
        type: String,
        required: false,
        max: 255
      },
      middleName: {
        type: String,
        required: false,
        max: 255
      },
      lastName: {
        type: String,
        required: false,
        max: 255
      },
      contactNumber: {
        type: String,
        required: false
      },
      kinship: {
        type: String,
        required: false
      }
    }
  ],
  isDischarged: {
    type: Boolean,
    required: true,
    default: 'false'
  },
  dischargedAt: {
    type: Date,
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

module.exports = mongoose.model('Patient', patientSchema)
