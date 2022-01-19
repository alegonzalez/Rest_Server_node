const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const generateJWT = require('../helpers/generateJWT') 
const login = async (req, res = response) => {
  const { email, password } = req.body
  try {
    //check if email exists
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'User not found' })
    }
    //check if user is active
    if (!user.state) {
      return res.status(400).json({ msg: 'User not exist' })
    }

    //check passowrd
    const validaPassword = bcrypt.compareSync(password, user.password)
    if (!validaPassword) {
      return res.status(400).json({ msg: 'Password not correct' })
    }
    //generate jwt
    const token = await generateJWT(user.id)

    res.json({
      user,
      token
    })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ msg: 'Error, please contact your administrator' })
  }
}

module.exports = {
  login
}
