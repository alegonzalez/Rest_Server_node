const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN)
    console.log('Database online')
  } catch (error) {
    console.log(error)
    throw new Error('Error try to initializate the database')
  }
}

module.exports = {
  dbConnection
}
