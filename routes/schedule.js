const express = require('express');

const scheduleController = require('../controllers/schedule');

const router = express.Router();

// /admin/products => GET
router.get('/schedule', scheduleController.getSchedules);

// /admin/add-product => POST
router.post('/add-schedule', scheduleController.postAddSchedule);

router.get('/edit-schedule/:scheduleId', scheduleController.getEditProduct);

router.post('/edit-schedule', scheduleController.postEditSchedule);

router.post('/delete-schedule', scheduleController.postDeleteSchedule);

module.exports = router;
