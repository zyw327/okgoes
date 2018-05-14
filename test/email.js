const Okgoes = require('./index');
let mailOptions = {
    from: 'okgoes<okgoes@test.com>', // sender address
    to: 'test@test.com', // list of receivers
    subject: 'okgoes', // Subject line
    text: 'send email test', // plain text body
    html: 'email' // html body
};

const email = new Okgoes.Email({
    host: 'smtp.test.com',
    port: 25,
    user: 'okgoes@test.com',
    passwd: 'passwd'
});

email.setMailOptions(mailOptions);
(async function() {
    try {
        await email.send();
    } catch (error) {
        console.log(error);
    }
})();