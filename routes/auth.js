const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate_fields')
const router = Router()
router.post('/login',[
    check('email','The field email is required').isEmail(),
    check(
      'password',
      'The field password is required'
    ).not().isEmpty(),
    validateFields
] ,login)


module.exports = router;

