const { response } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const getUser = async (req, res = response) => {
  const { limite = 5, from = 0 } = req.query
  const query = { state: true }

  const [count, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limite))
  ]);

 res.json({
    count,
    users
  })
}
const putUser = async (req, res = response) => {
  const id = req.params.id
  const { _id, password, google, email, ...rest } = req.body
  if (password) {
    const salt = bcrypt.genSaltSync()
    rest.password = bcrypt.hashSync(password, salt)
  }
  const user = await User.findByIdAndUpdate(id, rest)
  res.json(user)
}
const postUser = async (req, res = response) => {
  const { name, email, password, role } = req.body
  const user = new User({ name, email, password, role })
  //encrypt passowrd
  const salt = bcrypt.genSaltSync()
  user.password = bcrypt.hashSync(password, salt)
  //save database
  await user.save()
  res.status(201).json({
    user
  })
}
const deleteUser = async(req, res = response) => {
  
  const { id } = req.params
  const uid = req.uid;
  const userAuthenticated = req.user;
//delete user from Database
//const user = await User.findByIdAndDelete(id)

//change state of user
const user = await User.findByIdAndUpdate(id, { state: false })
  res.json({
    user,
    userAuthenticated
  })
}

module.exports = {
  getUser,
  putUser,
  postUser,
  deleteUser
}
