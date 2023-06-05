import mysql from "mysql2";

const pool = mysql
    .createPool({
        host: "localhost",
        port: "3306",
        user: "root",
        password: "",
        database: "mohay",
    })
    .promise();

async function addFile(email, hashCode, fileName, fileCode) {
    if (await login(email, hashCode) === "success") {
        const userData = await getUser(email);
        if (getSemiColonAmount(fileName, userData == -1)) {
            await pool.query(`UPDATE users SET fileNames = '${fileName},${userData.fileNames}' WHERE email = '${email}';`);
            await pool.query(`UPDATE users SET fileCode = '${fileCode},${userData.fileCode}' WHERE email = '${email}';`);
        }
    }
}

async function getFile(email, hashCode, fileName) {
    if (await login(email, hashCode) === "success") {
        const userData = await getUser(email);

    }
}



async function modifyFile(email, hashCode, fileName, newFileCode) {

}

async function resetTable() {
    await pool.query("DROP TABLE users;");
    await pool.query("CREATE TABLE users (email VARCHAR(255) PRIMARY KEY, userName VARCHAR(255), hashCode VARCHAR(255), fileNames VARCHAR(255), fileCode LONGTEXT);");
}

async function getUser(email) {
    const [rows] = await pool.query(
        `
            SELECT * FROM users WHERE email = '${email}';
            `
    );
    return rows[0];
}

async function getUsers() {
    const [rows] = await pool.query("SELECT * FROM users;");
    return rows;
}

async function login(email, hashCode) {
    const user = await getUser(email);
    if (user !== undefined && user.hashCode === hashCode) {
        return "success";
    } else if (user === undefined) return "no user with this email";
    else return "wrong password";
}

async function addUser(email, userName, hashCode) {
    const userAvailible = await getUser(email);
    const emailLegit = checkEmail(email);
    if (emailLegit && userAvailible === undefined) {
        await pool.query(
            `
            INSERT INTO users(email, userName, hashCode, fileNames, fileCode) VALUES('${email}', '${userName}', '${hashCode}', '', '');
            `
        );
        return "success";
    } else if (emailLegit) return "email in wrong format";
    else return "email already used";
}

async function checkEmail(email) {
    let atUsed = false;
    let error = false;
    for (let i = 0; i < email.length; i++) {
        const element = email[i];
        if (element === "@" && !atUsed) atUsed = true;
        else if (element === "@" && atUsed) error = true;
    }
    console.log(atUsed && !error);
    return atUsed && !error;
}

async function getSemiColonAmount(fileName, userData) {
    let charTheSame = true;
    let result = 0;
    console.log(userData.fileNames.length);
    for (let i = 0; i < userData.fileNames.length; i++) {
        for (let j = 0; j < fileName.length && charTheSame; j++) {
            console.log(`${i + j}:${userData.fileNames.length}`);
            if (i + j >= userData.fileNames.length) { return -1; }
            if (userData.fileNames[i + j] !== fileName[j]) {
                charTheSame = false;
            }
            if (userData.fileNames[i] === ',') {
                result++;
            }
            if (j == fileName.length - 1 && charTheSame) {
                return result;
            }
        }
        charTheSame = true;
    }
    return -1;
}

//await resetTable();
//await addUser('lucahaas07@gmx.at', 'Luca Haas', 'lucahaas07@gmx.at');
//await addFile('lucahaas07@gmx.at', 'lucahaas07@gmx.at', 'file2', 'abcde');
const userData = await getUser('lucahaas07@gmx.at');
console.log(userData);
console.log(await getSemiColonAmount('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', userData));

const users = await getUsers();
console.log(users);