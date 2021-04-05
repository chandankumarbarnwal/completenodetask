const nodemailer = require('nodemailer');

const cron = require('node-cron');


//email msg option
const mailOptions = {
    from: 'chandanbarnwal111@gmail.com',
    to: ['mahadevbarnwal111@gmail.com'],
    subject: 'helllo',
    text: 'fffff'
}

//email transport config
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chandanbarnwal111@gmail.com',
        pass: '1'
    }
});

//send mail 
cron.schedule('* * * * * *', () => {

    transporter.sendMail(mailOptions, (err, info) => {
        if(err) {
            console.log(err);
        } else {
            console.log('email sent=> ' + info.response);
            console.log('email sent=> ' + info.pending);
            console.log('email sent=> ' + info.rejected);
            console.log('email sent=> ' + info.accepted);
            console.log('email sent=> ' + info.messageId);

        }
    });
});

