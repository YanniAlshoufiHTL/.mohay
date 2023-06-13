const express = require("express");
const database = require("./database");

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/login', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const result = await database.login(email, password);
    const userData = await database.getUser(email);
    res.status(202).send({
        loginState: userData.loginState
    });
});

app.get('/logout', async (req, res) => {
    const { email } = req.body;
    const { password } = req.body;
    const result = await database.logout(email, password);
    const userData = await database.getUser(email);
    res.status(202).send({
        loginState: userData.loginState
    });
});

app.get('/getMohayCode', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const fileCode = await database.getFile(email, fileName);
    if (fileCode === "wrong userdata") {
        res.status(401).send(fileCode);
    }
    console.log(fileCode);
    res.status(202).send({
        fileCode: fileCode
    });
});
/* TODO: Need to return transpiled code */
app.get('/addMohayFile', async (req, res) => {
    const { email } = req.body;
    const { fileName } = req.body;
    const { fileCode } = req.body;
    await database.addFile(email, fileName, fileCode);
    const result = analizeCode();
    res.status(202).send(fileCode);
});

function analizeCode() {
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
    await database.modifyFileName(email, fileName, newFileName);
    res.status(202).send(newFileName);
})

app.listen(PORT, () => {
    console.log("wow");
});