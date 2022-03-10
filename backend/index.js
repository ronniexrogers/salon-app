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
const router = require('./routes/Router')
const userRouter = require('./routes/UserRouter')

const cors = require('cors')
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).send(message)
})

//final api endpoint will be http://localhost:5001/api/appointments
app.use('/api/appointments', router)

//final api endpoint will be http://localhost:5001/api/users
app.use('/api/users', userRouter)


app.get('/', (req, res) => {
    res.send('Im the backend');
  });

  
//Start Server
app.listen(process.env.PORT || 5001, () => {
    console.log(`✅ PORT: ${app.get('port')} 🌟`)
})