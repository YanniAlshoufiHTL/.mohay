const mysql = require("mysql2");
const pool = mysql
    .createPool({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "mohay",
    })
    .promise();

async function main() {
    
}
main();

// Table functions
async function resetTable() {
    await dropTable();
    await createTable();
}

async function createTable() {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255), userName VARCHAR(255), hashCode VARCHAR(255), loginState INT, fileNames VARCHAR(255), fileCode LONGTEXT);"
    );
}

async function dropTable() {
    await pool.query("DROP TABLE IF EXISTS users;");
}

// User functions
async function addUser(email, userName, hashCode) {
    const user = await getUser(email);
    const emailLegit = await isEmailAllowed(email);
    if (emailLegit && user === undefined)
        return insertUser(email, userName, hashCode);
    else if (!emailLegit)
        return "email in wrong format";
    else
        return "email already used";
}

async function insertUser(email, userName, hashCode) {
    await pool.query(`INSERT INTO users(email, userName, hashCode, loginState, fileNames, fileCode) VALUES('${email}', '${userName}', '${hashCode}', '1', '', '');`);
    return "success";
}

async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users;");
    return rows;
}


async function getUser(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = '${email}';`);
    return rows[0];
}



// Login functions
async function login(email, hashCode) {
    let result = "wrong password";
    const user = await getUser(email);
    if (user !== undefined && user.hashCode === hashCode) {
        result = "success";
        await updateData('loginState', '1', email);
    }
    else if (user === undefined)
        result = "no user with this email";
    return result;
}

async function logout(email, hashCode) {
    let result = "wrong password";
    const user = await getUser(email);
    if (user !== undefined && user.hashCode === hashCode) {
        result = "success";
        await updateData('loginState', '0', email);
    }
    else if (user === undefined)
        result = "no user with this email";
    return result;
}

async function isEmailAllowed(email) {
    let atUsed = false;
    let error = false;
    for (let i = 0; i < email.length; i++) {
        const element = email[i];
        if (element === "@" && !atUsed) atUsed = true;
        else if (element === "@" && atUsed) error = true;
    }
    return atUsed && !error;
}

// File functions
async function addFile(email, fileName, fileCode) {
    const userData = await getUser(email);
    if (userData.loginState == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists[0]) return "Filename already taken";
        await updateData('fileNames', `${fileName},${userData.fileNames}`, email);
        await updateData('fileCode', `${fileCode},${userData.fileCode}`, email);
        return "success";
    }
    return "wrong userdata";
}
// fix terminal current try
async function deleteFile(email, fileName) {
    const userData = await getUser(email);
    if (userData.loginState == 1) {
        const fileExists = await isFileExisting(userData, fileName);

        if (fileExists.length == 1) return "File not found";

        const fileData = await deleteElementFromFilesArray(userData, fileExists[1]);
        await updateData('fileNames', fileData[0].toString(), email);
        await updateData('fileCode', fileData[1].toString(), email);
        return "success";
    }
    return "wrong userdata";
}

async function deleteElementFromFilesArray(userData, index) {
    let fileNames = userData.fileNames.split(",");
    let fileCode = userData.fileCode.split(",");
    fileNames.splice(index);
    fileCode.splice(index);
    return [fileNames, fileCode];
}

async function modifyFileName(email, fileName, newFileName) {
    const userData = await getUser(email);
    if (userData.loginState == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists.length == 1) return "File not found";
        const fileNames = userData.fileNames.split(",");
        fileNames[fileExists[1]] = newFileName;
        await updateData('fileNames', fileNames.toString(), email);
        return "success";
    }
    return "wrong userdata";
}

async function modifyFileCode(email, fileName, newFileCode) {
    const userData = await getUser(email);
    if (userData.loginState == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists.length == 1) return "File not found";
        const fileCode = userData.fileCode.split(",");
        fileCode[fileExists[1]] = newFileCode;
        await updateData('fileCode', fileCode.toString(), email);
        return "success";
    }
    return "wrong userdata";
}

async function getFile(email, fileName) {
    const userData = await getUser(email);
    if (userData.loginState == 1) {

        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists.length == 1) return "File not found";

        const fileCode = userData.fileCode.split(",");
        return fileCode[fileExists[1]];
    }
    return "wrong userdata";
}

async function isFileExisting(userData, fileName) {
    const fileNames = userData.fileNames.split(",");
    for (let i = 0; i < fileNames.length; i++) {
        if (fileNames[i] === fileName) return [true, i];
    }
    return [false];
}

async function updateData(coloumName, fileData, email) {
    await pool.query(
        `UPDATE users SET ${coloumName} = '${fileData}' WHERE email = '${email}';`
    );
}

module.exports = {
    addUser, insertUser, getUsers, getUser, login, logout, addFile, deleteFile, modifyFileName, modifyFileCode, getFile
};
