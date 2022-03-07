const express = require('express')

const router = express.Router()

const Image = require('../models/Image')
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile, downloadFile } = require('../s3')

// Get request to view events
router.get('/:key', (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)
  
    readStream.pipe(res)
  })
  
router.post('/', upload.single('image'), async (req, res) => {
    const file = req.file
    const description = req.body.description
    const newImage = await Image.create({path: file.path, description: description})
    console.log(file)
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result) // this is what I want to send to MongoDB
    res.send({imagePath: `/images/${result.Key}`, description: description})
    res.status(201).json(newImage)
  })

  router.post('/', async (req, res, next) => {
    try {
        const newImage = await Image.create(req.body)
        res.status(201).json(newBookmark)
    } catch(err) {
        next(err)
    }
})
  
module.exports = router