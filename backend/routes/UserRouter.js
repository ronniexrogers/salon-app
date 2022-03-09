const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/', async (req, res) => {
    console.log(req.body)
    const userData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      googleId: req.body.googleId,
      profilePicturePath: req.body.profilePicturePath,
      role: 'client',
    }
    await new User(userData).save()
  })


module.exports = router
