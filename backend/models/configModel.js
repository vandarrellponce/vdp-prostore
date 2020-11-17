import mongoose from 'mongoose'

const configSchema = mongoose.Schema(
  {
    appTitle: { type: String }
  },
  { timestamps: true }
)

const Config = mongoose.model('appconfig', configSchema)

export default Config
