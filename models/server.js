const express = require('express')
var cors = require('cors')
class Server {
  constructor () {
    this.app = express()
    this.userPath = '/api/users';
    //Middleware
    this.middleware()
    //routes
    this.routes()
    this.port = process.env.PORT
  }

  middleware () {
    //CORS
    this.app.use(cors())
    //parse and read of body
    this.app.use(express.json())
    //public path
    this.app.use(express.static('public'))
  }
  routes () {
   this.app.use(this.userPath, require('../routes/user')) 
  }
  listen () {
    this.app.listen(this.port, () => {
      console.log('Server is running in port ', this.port)
    })
  }
}

module.exports = Server
