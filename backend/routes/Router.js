const express = require('express')
const router = express.Router()

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const Appointment = require('../models/Appointment')
const nodemailer = require('nodemailer')

const { uploadFile, downloadFile } = require('../s3')
const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
})


router.get('/:key', (req, res) => {
    const key = req.params.key
    const readStream = downloadFile(key)
    readStream.pipe(res)
  })
  
router.post('/createAppointment', upload.single('image'), async (req, res, next) => {
  try {

    const adminOptions = {
      from: process.env.EMAIL,
      to: process.env.RECEIVING_EMAIL,
      subject: "New appointment created!",
      text: `Check your site! ${req.body.clientName} created an appointment on ${req.body.date} at ${req.body.time}. Purrrrrr. https://www.denisseonfire.com/`
    }

    const userOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "Thank you for booking your appointment!",
      text: `Thank you, ${req.body.clientName}!  Your appointment has been created for ${req.body.date} at ${req.body.time}. If you have any questions or need to reschedule you can contact me here https://www.denisseonfire.com/contact. Note, don't reply to this email as this account is not monitored.`
    }

    transporter.sendMail(adminOptions, function (err, info) {
      if(err) {
        console.log(err)
        return
      }
      console.log(info.response)
    })

    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    unlinkFile(file.path)
    const appointmentData = {
      imagePath: result.Location,
      description: req.body.description,
      name: req.body.clientName,
      number: req.body.number,
      date: req.body.date,
      time: req.body.time,
      email: req.body.email,
      googleId: req.body.googleId
    }
    await new Appointment(appointmentData).save() 
    
    transporter.sendMail(userOptions, function (err, info) {
      if(err) {
        console.log(err)
        return
      }
      console.log(info.response)
    })
  }
    catch(error) {
      console.log(error)
    }
  })

router.get('/', async (req, res, next) => {
  try{
      const allAppointments = await Appointment.find()
      res.json(allAppointments)
  } catch(err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const appointmentToDelete = await Appointment.findByIdAndDelete(req.params.id)
    console.log(appointmentToDelete)
    if (appointmentToDelete) {
      res.sendStatus(204)
    } else {
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router