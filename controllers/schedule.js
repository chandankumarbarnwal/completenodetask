const Schedule = require('../models/schedule');

exports.getSchedules = (req, res, next) => {

  Schedule.findAll()
    .then(schedules => {
      res.status(200).json({ 
        status: 200,
        message: 'All Schedules',
        data: schedules
      });
    })
    .catch(err => {
      console.log(err);
    });
};



exports.postAddSchedule = (req, res, next) => {
  const schedule = req.body.schedule;

  Schedule
    .create({
      schedule: schedule
    })
    .then(result => {
      res.status(200).json({ 
        status: 200,
        message: 'Schedule created successfully',
        data: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const scheduleId = req.params.scheduleId;
  Schedule.findByPk(scheduleId)
    .then(schedule => {
      res.status(200).json({ 
        status: 200,
        message: 'One schedule',
        data: schedule
      });
    })
    .catch(err => console.log(err));
};


exports.postEditSchedule = (req, res, next) => {
    const scheduleId = req.body.scheduleId;
    const updatedSchedule = req.body.schedule;
    Schedule.findByPk(scheduleId)
      .then(schedule => {
        schedule.schedule = updatedSchedule;
        return schedule.save();
      })
      .then(result => {
        res.status(200).json({ 
          status: 200,
          message: 'Schedule updated successfully',
          data: result
        });
      })
      .catch(err => console.log(err));
  };
  

  exports.postDeleteSchedule = (req, res, next) => {
    const scheduleId = req.body.scheduleId;
    Schedule.findByPk(scheduleId)
      .then(schedule => {
        return schedule.destroy();
      })
      .then(result => {
        res.status(200).json({ 
          status: 200,
          message: 'Schedule deleted successfully',
          data: result
        });
      })
      .catch(err => console.log(err));
  };


