var express = require('express')

const bodyParser = require('body-parser');

const Schedule = require('./models/schedule');

 
var app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
 
const sequelize = require('./util/database');

const scheduleRoutes = require('./routes/schedule');
const userRoutes = require('./routes/user');
const { schedule } = require('node-cron');

app.use('/admin', scheduleRoutes);
app.use('/admin', userRoutes);


sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(4000);
  })
  .catch(err => {
    console.log(err);
  });
