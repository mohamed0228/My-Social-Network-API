const router = require('express').Router();


const { get } = require('express/lib/response');
const { 
    getAllUsers,
    createUser,
    getUserById
} = require('../../controllers/user-controller');



router
.route('/')
.get(getAllUsers)
.post(createUser)
router
.route('/:id')
.get(getUserById)






















module.exports = router;