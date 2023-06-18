const emailValidator = require('deep-email-validator');
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
    /*await addUser('lucahaas07@gmx.at', 'Luca Haas', 'klajdsklfjasdklfjaklsdjflk', '029123', '2023-06-18T13:10:49.000Z');
    console.log(await getUsers());*/
}

main();

// Table functions
async function resetTable() {
    await dropTable();
    await createTable();
}

async function createTable() {
    await pool.query(
        "CREATE TABLE IF NOT EXISTS users (id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(255), userName VARCHAR(255), hashCode VARCHAR(255), verificationCode INT, dateCreated DATETIME, verified INT, loginState INT, fileNames VARCHAR(255), fileCode LONGTEXT);"
    );
}

async function dropTable() {
    await pool.query("DROP TABLE IF EXISTS users;");
}

// User functions
async function addUser(email, userName, hashCode, verificationCode, timeCreated) {
    const user = await getUser(email);
    const emailLegit = await isEmailAllowed(email);
    if (emailLegit && user === undefined)
        return insertUser(email, userName, hashCode, verificationCode, timeCreated);
    else if (!emailLegit)
        return 403;
    else
        return 403;
}

async function insertUser(email, userName, hashCode, verificationCode, timeCreated) {
    await pool.query(`INSERT INTO users(email, userName, hashCode, verificationCode, dateCreated, verified, loginState, fileNames, fileCode) VALUES('${email}', '${userName}', '${hashCode}', '${verificationCode}', '${timeCreated}', '0', '1', '', '');`);
    return 200;
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
    let result;
    const userData = await getUser(email);
    if (userData !== undefined && userData.hashCode === hashCode && userData.loginState != 1) {
        result = 200;
        await updateData('loginState', '1', email);
    } else if (userData !== undefined && userData.hashCode === hashCode && userData.loginState == 1 && userData.verified == 1)
        result = 406;

    else if (userData === undefined)
        result = 400;
    else
        result = 401;
    return result;
}

async function logout(email, hashCode) {
    let result;
    const userData = await getUser(email);
    if (userData !== undefined && userData.hashCode === hashCode && userData.loginState != 0) {
        result = 200;
        await updateData('loginState', '0', email);
    } else if (userData !== undefined && userData.hashCode === hashCode && userData.loginState == 0)
        result = 406;

    else if (userData === undefined)
        result = 400;
    else
        result = 401;
    return result;
}

async function getLoginState(email) {
    const userData = getuser(email);
    if (userData) return userData.loginState;
    return -1;
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
    if (userData === undefined)
        return 400;
    if (userData.loginState == 1 && userData.verified == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists[0]) return 409;
        await updateData('fileNames', `${fileName},${userData.fileNames}`, email);
        await updateData('fileCode', `${fileCode},${userData.fileCode}`, email);
        return 200;
    }
}

async function deleteFile(email, fileName) {
    const userData = await getUser(email);
    console.log(userData);
    if (userData === undefined)
        return 400;
    if (userData.loginState == 1 && userData.verified == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists.length == 1) return 404;
        const fileData = await deleteElementFromFilesArray(userData, fileExists[1]);
        await updateData('fileNames', fileData[0].toString(), email);
        await updateData('fileCode', fileData[1].toString(), email);
        return 200;
    }
    return 401;
}

async function deleteElementFromFilesArray(userData, index) {
    let fileNames = userData.fileNames.split(",");
    let fileCode = userData.fileCode.split(",");
    fileNames.splice(index, 1);
    fileCode.splice(index, 1);
    return [fileNames, fileCode];
}

async function modifyFileName(email, fileName, newFileName) {
    const userData = await getUser(email);
    if (userData === undefined)
        return 400;
    if ((await isFileExisting(userData, newFileName)).length != 1)
        return 404;
    if (userData.loginState == 1 && userData.verified == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists.length == 1) return 404;
        const fileNames = userData.fileNames.split(",");
        fileNames[fileExists[1]] = newFileName;
        await updateData('fileNames', fileNames.toString(), email);
        return 200;
    }
    return 401;
}

async function modifyFileCode(email, fileName, newFileCode) {
    const userData = await getUser(email);
    if (userData === undefined)
        return 400;
    if (userData.loginState == 1 && userData.verified == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists.length == 1) return 404;
        const fileCode = userData.fileCode.split(",");
        fileCode[fileExists[1]] = newFileCode;
        await updateData('fileCode', fileCode.toString(), email);
        return 200;
    }
    return 401;
}

async function getFile(email, fileName) {
    const userData = await getUser(email);
    if (userData === undefined) {
        return [400]
    } else if (userData.loginState == 1 && userData.verified == 1) {
        const fileExists = await isFileExisting(userData, fileName);
        if (fileExists.length == 1) return [404];

        const fileCode = userData.fileCode.split(",");
        return [200, fileCode[fileExists[1]]];
    }
    return [401];
}

async function getFiles(email) {
    const userData = await getUser(email);
    if (userData === undefined) {
        return [400]
    } else if (userData.loginState == 1 && userData.verified == 1) {
        const fileNames = userData.fileNames.split(',');
        const fileCodes = userData.fileCode.split(',');
        fileNames.pop();
        fileCodes.pop();
        return [200, [fileNames, fileCodes]];
    }
    return [401];
}

async function isFileExisting(userData, fileName) {
    const fileNames = userData.fileNames.split(",");
    for (let i = 0; i < fileNames.length; i++)
        if (fileNames[i] === fileName) return [true, i];
    return [false];
}

async function updateData(coloumName, fileData, email) {
    await pool.query(
        `UPDATE users SET ${coloumName} = '${fileData}' WHERE email = '${email}';`
    );
}

module.exports = {
    getFiles,
    updateData,
    addUser,
    insertUser,
    getUsers,
    getUser,
    login,
    logout,
    addFile,
    deleteFile,
    modifyFileName,
    modifyFileCode,
    getFile,
    getLoginState
};