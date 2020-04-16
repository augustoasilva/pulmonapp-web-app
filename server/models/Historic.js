const mongoose = require('mongoose')

const historicSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'ADMITTED',
      'DISCHARGED',
      'CHANGED-TIDAL-VOLUME',
      'UPDATED-PATIENT',
      'OTHER'
    ],
    default: 'ADMITTED'
  },
  description: {
    type: String,
    required: true
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

module.exports = mongoose.model('Historic', historicSchema)
