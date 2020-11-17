import express from 'express'
import Config from '../models/configModel.js'

const router = express.Router()

router.get('/appconfig', async (req, res) => {
  try {
    const appConfig = await Config.find()
    res.send(appConfig[0])
  } catch (error) {
    console.log(error)
    res.send({ error: error.message })
  }
})

export default router
