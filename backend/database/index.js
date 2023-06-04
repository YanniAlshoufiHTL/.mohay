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
        await pool.query(`UPDATE users SET files = '${userData.files}${userData === '' ? '' : ','}${fileName}:${fileCode}' WHERE email = '${email}';`);
    }
}

async function modifyFile(email, hashCode, fileName, newFileCode) {

}

async function resetTable() {
    await pool.query("DROP TABLE users;");
    await pool.query("CREATE TABLE users (email VARCHAR(255) PRIMARY KEY, userName VARCHAR(255), hashCode VARCHAR(255), files LONGTEXT);");
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
            INSERT INTO users(email, userName, hashCode, files) VALUES('${email}', '${userName}', '${hashCode}', '');
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

await addFile('lucahaas07@gmx.at', 'lucahaas07@gmx.at', 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', 'abcde');

const users = await getUsers();
console.log(users);