const { response } = require('express')
const getUser = (req, res = response) => {
  const {name='',state=''} = req.query;
  res.json({
    msg: 'Get API Controller',
    name,
    state
  })
}
const putUser = (req, res = response) => {
  const id = req.params.id
  res.json({
    msg: 'Put API Controller',
    id
  })
}
const postUser = (req, res = response) => {
  const {name,age} =req.body;
  res.status(201).json({
    msg: 'Post API Controller',
    name,
    age
  })
}
const deleteUser = (req, res = response) => {
  res.json({
    msg: 'Delete API Controller'
  })
}

module.exports = {
  getUser,
  putUser,
  postUser,
  deleteUser
}
