const express = require('express');
const userController= require('../controllers/userController');
const {signUp,signIn,deleteUser} = require('../controllers/authController');


const router = express.Router();

router.post('/signup', signUp);
router.post("/signin",signIn);


router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(deleteUser);

module.exports = router;