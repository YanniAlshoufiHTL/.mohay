const express = require("express");
const nodeMailer = require("nodemailer");
const database = require("./database");
const mail = require("./mail.js");

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/login', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const result = await database.login(email, password);
    res.status(result).send();
});

app.get('/logout', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const result = await database.logout(email, password);
    res.status(result).send();
});

app.get('/getMohayCode', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const returnValue = await database.getFile(email, fileName);
    if (returnValue.length == 2)
        res.status(returnValue[0]).send(returnValue[1]);
    else
        res.status(returnValue[0]).send();
});

/* TODO: Need to return transpiled code */
app.get('/addMohayFile', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { fileCode } = req.body;
    const code = await database.addFile(email, fileName, fileCode);
    const result = transpileCode(fileCode);
    console.log(await database.getUser(email));
    res.status(code).send({ analizedCode: result });
});

app.get('/getMohayFiles', async (req, res) => {
    const { email } = req.body;
    const result = await database.getFiles(email);
    console.log(result);
    if (result.length == 1) {
        res.status(result[0]).send();
    } else {
        res.status(result[0]).send({
            fileNames: result[1][0],
            fileCodes: result[1][1]
        })
    }
});

app.get('/deleteMohayFile', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const code = await database.deleteFile(email, fileName);
    res.status(code).send();
});

app.get('/modifyMohayFileCode', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { fileCode } = req.body;
    const code = await database.modifyFileCode(email, fileName, fileCode);
    console.log(await database.getUser(email));
    res.status(code).send();
});

app.get('/modifyMohayFileName', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { newFileName } = req.body;
    const code = await database.modifyFileName(email, fileName, newFileName);
    console.log(await database.getUser(email));
    res.status(code).send();
});

function transpileCode() {
    return "";
}

app.get('/modifyMohayFileCode', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { fileCode } = req.body;
    await database.modifyFileCode(email, fileName, fileCode);
    res.status(202).send(fileCode);
})

app.get('/modifyMohayFileName', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { newFileName } = req.body;
    const code = await database.modifyFileName(email, fileName, newFileName);
    res.status(code).send(newFileName);
});

app.get('/enterVerificationCode', async (req, res) => {
    const { email } = req.body;
    const { verificationCode } = req.body;
    let code = 400;
    const userData = await database.getUser(email);
    console.log(userData.dateCreated);
    console.log(new Date());
    if (userData === undefined) code = 404;
    else if (userData.verificationCode == verificationCode && isDateValid(userData.dateCreated)) {
        await database.updateData('verified', '1', email);
        code = 200;
    }
    res.status(code).send();
});

function isDateValid(date) {
    const current = new Date();
    const dateCreated = convertMysqlToJsDate(date);
    const differnce = current - dateCreated;
    if (differnce <= 300000) return true;
    return false;
}

app.get('/registerUser', async (req, res) => {
    const { email } = req.body;
    const { userName } = req.body;
    const { password } = req.body;
    const verificationCode = sendEmail(email);
    const timeCreated = convertJsToMysqlDate(new Date());
    const code = await database.addUser(email, userName, password, verificationCode, timeCreated);
    res.status(code).send();
});
// TODO: correct Date Conversion
function convertMysqlToJsDate(date) {
    const time = date.split(/[- :]/);
    return new Date(Date.UTC(time[0], time[1] - 1, time[2], time[3], time[4], time[5]));
}

function convertJsToMysqlDate(date) {
    return date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
}

function sendEmail(email) {
    return verificationCode = mail.sendEmail(email);
}


app.listen(PORT, () => {
    console.log("listening on http://localhost:8080");
});