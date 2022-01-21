const { Router } = require('express')
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth')
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

router.post('/google',[
    check('id_token','The id token is required').not().isEmpty(),
    validateFields
] ,googleSignIn)


module.exports = router;

