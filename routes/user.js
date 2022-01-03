const { Router } = require('express')
const router = Router()
const { getUser,putUser,postUser,deleteUser } = require('../controllers/user')
router.get('/', getUser)
router.put('/:id', putUser)
router.post('/', postUser)
router.delete('/',deleteUser)

module.exports = router;
