const mongoose = require('mongoose')

const tokenListSchema = new mongoose.Schema({
  token: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['access', 'refresh'],
    default: 'access'
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

module.exports = mongoose.model('TokenList', tokenListSchema)
