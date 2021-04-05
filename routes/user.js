const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/products => GET
router.get('/users', userController.getUsers);

// // /admin/add-product => POST
router.post('/add-user', userController.postAddUser);

router.get('/edit-user/:userId', userController.getEditUser);

router.post('/edit-user', userController.postEditUser);

router.post('/delete-user', userController.postDeleteUser);

router.get('/user-mail-sent', userController.getMailSent);

router.get('/user-mail-not-sent', userController.getMailNotSent);


router.get('/send-mail-to-users', userController.sendMailToUser);



module.exports = router;
