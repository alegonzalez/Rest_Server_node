const { response, request } = require('express')
const  User  = require('../models/user')
const jwt = require('jsonwebtoken')
const validateJWT =  async(req = request, res = response, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({ msg: 'There are no tokens' })
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
    
    const user = await User.findOne({_id:uid })

    //check if user was deleted
    if(!user.state){
      return res.status(401).json({ msg: 'Token not valid' })
    }
    req.uid = uid
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: 'Token not valid' })
  }
}

module.exports = { validateJWT }
