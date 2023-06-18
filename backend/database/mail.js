const nodeMailer = require("nodemailer");
const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
        user: "mohayinc@gmail.com",
        pass: "vqgzuzkgpbtfyocy"
    }
});

const mailOptions = {
    from: "mohayinc@gmail.com",
    subject: "Verification"
}

function genereteVerificationCode() {
    let code = 0;
    for (let num = 0, multiplicator = 1; num < 6; num++, multiplicator *= 10)
        code += Math.floor(Math.random() * 10) * multiplicator;
    return code;
}


function sendEmail(email) {
    const verificationCode = genereteVerificationCode();
    mailOptions.to = email;
    mailOptions.text = `Your current Verificationcode is ${verificationCode} and will last for 5 minutes!`;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) console.log(error);
        else console.log(`Email sent: ` + info.response);
    });
    return verificationCode;
}

module.exports = {
    sendEmail
};