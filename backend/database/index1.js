import mysql from 'mysql'

const con = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "",
    database: "mohay",
});

let value = login('lucahaas07@gmx.at', 'emilisttoll');
console.log(value);

function addUser(email, userName, hashCode) {
    con.query(
        `INSERT INTO users(Email, UserName, HashCode) VALUES ('${email}', '${userName}', '${hashCode}');`,
        function(err, result) {
            if (err) throw err;
        }
    );
}

function login(email, hashCode) {
    const promise = new Promise(function(resolve, reject) {
        con.query(
            `SELECT * FROM users WHERE email = '${email}'`,
            function(err, result) {
                console.log(result);
                if (err) {
                    resolve("database connection lost");
                } else if (result.length == 0) {
                    resolve("no user with this email");
                } else if (result[0].hashCode === hashCode) {
                    resolve("succes");
                } else {
                    resolve("wrong password");
                }
                reject();
            }
        );
    });
    console.log('hall');
    promise.then({
        function(value) {
            console.log('hallo');
            return value;
        }
    });
}

function createConnection() {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

function createDatabase() {
    con.query("CREATE DATABASE mohay", function(err, result) {
        if (err) throw err;
        console.log("Database created");
    });
}

function createTable() {
    con.query(
        "CREATE TABLE users(email VARCHAR(255) PRIMARY KEY, userName VARCHAR(255), hashCode VARCHAR(255));",
        function(err, result) {
            if (err) {
                console.log("that did not work");
                throw err;
            }
            console.log("table created");
        }
    );
}

function removeDatabase() {
    con.query("DROP DATABASE mohay;", function(err, result) {
        if (err) throw err;
        console.log("database removed!");
    });
}

function removeTable() {
    con.query("DROP TABLE IF EXISTS users;", function(err, result) {
        if (err) throw err;
    });
}