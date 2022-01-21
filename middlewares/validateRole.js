const { response } = require('express')

const validateRole = (req, res = response, next) => {
 try {
  
  if (!req.user) {
    res.status(500).json({ msg: 'try to validate the role ' });
  }
  const { role, name } = req.user
  if (role !== 'ADMIN_ROLE') {
    res.status(401).json({ msg: `${name} is not administrator` });
  }
  next()

 } catch (error) {
     res.status(401).json({ msg: `${name} is not administrator` });
 }
}

const hasDifferentRole = ( ...roles ) => {
  return (req, res = response, next) => {
   try {
    if (!req.user) {
      res.status(500).json({ msg: 'try to validate the role without a token valid ' });
    }
    
    if(!roles.includes(req.user.role)) {
      res.status(401).json({ msg: `The service require  some of this roles` });
    }
    next() 
   } catch (error) {
     
   }
    
  }
}
module.exports = { validateRole, hasDifferentRole }
