const emailValidator = require('deep-email-validator');
 
const email = 'chandanbarnwal111@gmaisl.com';

async function isEmailValid(email) {

    const ff = await emailValidator.validate(email);

    console.log(ff.valid)

 return await emailValidator.validate(email);


}

isEmailValid(email);