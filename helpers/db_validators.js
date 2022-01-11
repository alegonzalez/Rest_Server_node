const Role = require('../models/role')
const User = require('../models/user')
const isvalidRole = async (role = '') => {
  const existRol = await Role.findOne({ role })
  if (!existRol) {
    throw new Error(`The role ${role} is not registered in the database`)
  }
}
//check if email exist
const checkEmailExist = async (email = '') => {
  console.log('The email is', email)
  existEmail = await User.findOne({ email })
  if (existEmail) {
    throw new Error(`The email ${email} already exists`)
  }
}

const existUserById = async( id ) => {
  const existUser = await User.findById(id);
  if( !existUser ) {
    throw new Error(`The id ${id} not exists`);
  }
}

module.exports = {
  isvalidRole,
  checkEmailExist,
  existUserById
}
