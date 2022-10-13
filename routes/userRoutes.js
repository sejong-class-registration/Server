const express = require('express');
const userController= require('../controllers/userController');
const {signUp,signIn} = require('../controllers/authController');
const multer = require('multer');
// const upload = multer();

const router = express.Router();

router.post('/signup', signUp);
router.post("/signin",signIn);

router
.route('/')
.get(userController.getAllUsers)
.post(userController.createUser);

router
.route('/:id')
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route('/:id/excel').post(upload.single('xlsx'), userController.uploadExcel);

module.exports = router;