//Basic Config
const express = require('express')
const axios = require('axios')
require('./db/connection')
const app = express()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const cors = require('cors')
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const imageController = require('./controllers/imageController')
app.use('/images/', imageController)

app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

app.get('/', (req, res) => {
    res.send('Im the backend');
  });

  
//Start Server
app.listen(process.env.PORT || 5001, () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})