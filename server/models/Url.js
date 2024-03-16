import mongoose from 'mongoose'

const URL = mongoose.Schema({
  full_url: {
    type: String,
    required: true
  },
  short_url: {
    type: String,
    required: true
  },
  no_of_scans: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
})

export default mongoose.model('URLs', URL)
