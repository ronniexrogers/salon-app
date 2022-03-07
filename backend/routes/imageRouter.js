const express = require('express')
const router = express.Router()

const ClientImage = require('../models/Image')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const imageController = require('../controllers/imageController')

const { uploadFile, downloadFile } = require('../s3')

// Get request to view events
router.get('/:key', (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)
    readStream.pipe(res)
  })
  
router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file
    const result = await uploadFile(file)
    unlinkFile(file.path)
    console.log(result) // this is what I want to send to MongoDB
    const description = req.body.description
    const imageData = {
      path: result.Location,
      description: req.body.description
    }
    console.log(imageData)
    await new ClientImage(imageData).save()
  })

router.post('/clientImages', imageController.uploadClientImage)

router.post('/salonImages', imageController.uploadSalonImage)


module.exports = router