
const express = require("express");
const router = express.Router();
const userController = require("../../app/Http/Controllers/userController")
const {validateUser} = require('../../app/Http/middleware/userValidator');
const {validateGet} = require('../../app/Http/middleware/validateGet');



//route for getting user details with email and password
router.post('/api/user',validateGet, userController.getUser);

//route for posting new user details
router.post('/api/create', validateUser, userController.createUser);

//route for posting updating user details
router.put('/api/update', userController.updateUser)

//route for deleting user details 
router.delete('/api/destroy', userController.deleteUser);



module.exports = router;