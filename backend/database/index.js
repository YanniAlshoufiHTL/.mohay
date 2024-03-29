const express = require("express");
const nodeMailer = require("nodemailer");
const database = require("./database");
const mail = require("./mail.js");
const tcpClient = require("./tcp_client.js");
const cors = require("cors");

const app = express();
const PORT = 7000;

app.use(cors())
app.use(express.json());

tcpClient.createTCPConnection();

app.post('/loose-transpile', async (req, res) => {
    const code = req.body.code;
    const result = await transpileCode(code);
    res.send({result: result.toString()});
});

app.post('/login', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const result = await database.login(email, password);
    res.status(result).send();
});

app.post('/logout', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const result = await database.logout(email, password);
    res.status(result).send();
});

app.post('/getMohayCode', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const returnValue = await database.getFile(email, fileName);
    if (returnValue.length == 2)
        res.status(returnValue[0]).send(returnValue[1]);
    else
        res.status(returnValue[0]).send();
});


async function transpileCode(fileCode) {
    return tcpClient.sendMessage(fileCode);
}
/* TODO: Need to return transpiled code */
app.post('/addMohayFile', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { fileCode } = req.body;
    const code = await database.addFile(email, fileName, fileCode);
    const result = await transpileCode(fileCode);
    res.status(code).send({
        transpiledCode: result
    });
});


app.post('/getMohayFiles', async (req, res) => {
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

app.post('/deleteMohayFile', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const code = await database.deleteFile(email, fileName);
    res.status(code).send();
});

app.post('/modifyMohayFileCode', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { fileCode } = req.body;
    const code = await database.modifyFileCode(email, fileName, fileCode);
    console.log(await database.getUser(email));
    res.status(code).send();
});

app.post('/modifyMohayFileName', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { newFileName } = req.body;
    const code = await database.modifyFileName(email, fileName, newFileName);
    console.log(await database.getUser(email));
    res.status(code).send();
});

app.post('/modifyMohayFileCode', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { fileCode } = req.body;
    await database.modifyFileCode(email, fileName, fileCode);
    res.status(202).send(fileCode);
})

app.post('/modifyMohayFileName', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { newFileName } = req.body;
    const code = await database.modifyFileName(email, fileName, newFileName);
    res.status(code).send(newFileName);
});

app.post('/removeUser', async (req, res) => {
    const { email } = req.body;
    const code = await database.removeUser(email);
    res.status(code).send();
});

app.post('/enterVerificationCode', async (req, res) => {
    const { email } = req.body;
    const { verificationCode } = req.body;
    let code = 400;
    const userData = await database.getUser(email);
    if (userData === undefined) code = 404;
    else if (userData.verificationCode == verificationCode) {
        await database.updateData('verified', '1', email);
        code = 200;
    }
    res.status(code).send();
});

app.post('/registerUser', async (req, res) => {
    const { email } = req.body;
    const { userName } = req.body;
    const { password } = req.body;
    const verificationCode = sendEmail(email);
    const code = await database.addUser(email, userName, password, verificationCode);
    res.status(code).send();
});

function sendEmail(email) {
    return verificationCode = mail.sendEmail(email);
}


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});

/* Codes:
400: user not found
401: not authorized(wrong password)
403: email wrong format
404: file not found
409: file already exists
*/