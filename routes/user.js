const { Router } = require('express')
const router = Router()
const {
  isvalidRole,
  checkEmailExist,
  existUserById
} = require('../helpers/db_validators')
const {
  getUser,
  putUser,
  postUser,
  deleteUser
} = require('../controllers/user')
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate_fields')
router.get('/', getUser)
router.put(
  '/:id',
  [
    check('id', 'Id not valid').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isvalidRole),
    validateFields
  ],
  putUser
)
router.post(
  '/',
  [
    check('name', 'The field name is required')
      .not()
      .isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(checkEmailExist),
    check(
      'password',
      'The field password should be  minimum 6 characters'
    ).isLength({ min: 6 }),
    //check('role','The role is not valid').isIn('ADMIN_ROLE','USER_ROLE'),
    check('role').custom(isvalidRole),
    validateFields
  ],
  postUser
)
router.delete(
  '/:id',
  [check('id', 'Id not valid').isMongoId(), check('id').custom(existUserById)],
  validateFields,
  deleteUser
)

module.exports = router
