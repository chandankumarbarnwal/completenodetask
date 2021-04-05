const User = require('../models/user');

const nodemailer = require('nodemailer');

const cron = require('node-cron');

//email transport config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'chandanbarnwal111@gmail.com',
      pass: 'ch'
  }
});

//email msg option
const mailOptions = {
  from: 'chandanbarnwal111@gmail.com',
  subject: 'helllo',
  text: 'fffff'
}


exports.getUsers = (req, res, next) => {

  User.findAll()
    .then(users => {
      res.status(200).json({ 
        status: 200,
        message: 'All User list',
        data: users
      });
    })
    .catch(err => {
      console.log(err);
    });
};



exports.postAddUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;

  User
    .create({
        name: name,
        email: email
    })
    .then(result => {
      res.status(200).json({ 
        status: 200,
        message: 'User created successfully',
        data: result
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditUser = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then(user => {
      res.status(200).json({ 
        status: 200,
        message: 'One user details',
        data: user
      });
    })
    .catch(err => console.log(err));
};


exports.postEditUser = (req, res, next) => {
    const userId = req.body.userId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    User.findByPk(userId)
      .then(user => {
        user.name = updatedName;
        user.email = updatedEmail
        return user.save();
      })
      .then(result => {
        res.status(200).json({ 
          status: 200,
          message: 'user updated successfully',
          data: result
        });
      })
      .catch(err => console.log(err));
  };
  

  exports.postDeleteUser = (req, res, next) => {
    const userId = req.body.userId;
    User.findByPk(userId)
      .then(user => {
        return user.destroy();
      })
      .then(result => {
        res.status(200).json({ 
          status: 200,
          message: 'user deleted successfully',
          data: result
        });
      })
      .catch(err => console.log(err));
  };


  exports.getMailSent = (req, res, next) => {

    User.findAll({where: {mailSent:1}})
      .then(users => {
        res.status(200).json({ 
          status: 200,
          message: 'All User list',
          data: users
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  exports.getMailNotSent = (req, res, next) => {

    User.findAll({where: {mailSent:0}})
      .then(users => {
        res.status(200).json({ 
          status: 200,
          message: 'All User list',
          data: users
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  

  exports.sendMailToUser = (req, res, next) => {

    User.findAll()
      .then(users => {
        // console.log(users);
        users.map((i,d,v) => {
          let email = i.email;
          mailOptions.to = email;

          transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log(err);
            } else {
              User.update({ mailSent: 1 }, {
                where: {
                  email: email
                }
              });
                console.log('email sent=> ' + info.messageId);
    
            }
          });
          
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


cron.schedule('* * * * * *', () => {

  User.findAll()
  .then(users => {
    // console.log(users);
    users.map((i,d,v) => {
      let email = i.email;
      mailOptions.to = email;

      transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
          User.update({ mailSent: 1 }, {
            where: {
              email: email
            }
          });
            console.log('email sent=> ' + info.messageId);

        }
      });
      
    });
  })
  .catch(err => {
    console.log(err);
  });

});

