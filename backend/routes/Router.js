const express = require('express')
const router = express.Router()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const imageController = require('../controllers/imageController')
const Appointment = require('../models/Appointment')
const User = require('../models/User')

const { google0authHandler } = require('../controllers/SessionController')
const { uploadFile, downloadFile } = require('../s3')


router.get('/:key', (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)
    readStream.pipe(res)
  })
  
router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    unlinkFile(file.path)
    const description = req.body.description
    const appointmentData = {
      imagePath: result.Location,
      description: req.body.description,
      name: req.body.clientName,
      number: req.body.number,
      date: req.body.date
    }
    await new Appointment(appointmentData).save()
  })



module.exports = router