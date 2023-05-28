function analyze() {
    var code = document.getElementById("myDiv").innerText;

    var errors = [];
    var warnings = [];

    let lines = code.split(";");
    lines = Preprocess(lines);

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        let identity = indentify(line, i);
    }
}

function Preprocess(lines) {
    lines = lines.fulter((item) => item != "");

    for (let i = 0; i < lines.length; i++) {
        lines[i] = deleteCharBetween(lines[i], "(", ")", " ");
    }

    return lines;
}

function indentify(line, row) {
    // line stuff stuff stuff data;
    line = line.slice(0, -1); //remove ending ;

    let tokes = validate(line, row);
}

function validate(line, row) {
    switch (true) {
        case line.startsWith("."):
            checkForVarialbe(line, row);
            break;
        case line.startsWith("wow"):
            checkForConstant(line, row);
            break;
        case line.startsWith("line"):
            checkForLine(line, row);
            break;
        case line.startsWith("rect"):
            checkForRect(line, row);
            break;
        case line.startsWith("point"):
            checkForPoint(line, row);
            break;
        case line.startsWith("circle"):
            checkForCircle(line, row);
            break;
        case line.startsWith("arc"):
            checkForArc(line, row);
            break;
        case line.startsWith("polygon"):
            checkForPolygon(line, row);
            break;
        case line.startsWith("vector"):
            checkForVector(line, row);
            break;
        default:
            errors.push({ row: row, message: "Invalid line" });
            break;
        //TODO: add Attributes
    }
}

function checkForVariable(line, row) {
    let tokens = line.split(" ");

    if (tokens.length < 3) {
        errors.push({
            row: row,
            char: "0",
            message: "Invalid variable declaration",
        });
        return false;
    }

    if (tokens[1] !== "=") {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Invalid variable declaration",
        });
        return false;
    }

    //now everything till = is valid
    line = line.substring(line.indexOf("=") + 1);

    switch (true) {
        case tokens[2].startsWith("."):
            //some variable
            if (tokens.length !== 4) {
                errors.push({
                    row: row,
                    char: indexOf(tokens[2]),
                    message: "Invalid cast of variable",
                });
                return false;
            }

            break;
        case tokens.length === 4 && tokens[3] == ";":
            //some constant probaly
            break;
        case tokens[2] === "line":
            //line
            checkForLine(line, row);
            break;
        case tokens[2] === "point":
            //point
            checkForLine(line, row);
            break;
        case tokens[2] === "rect":
            //rect
            checkForRect(line, row);
            break;
        case tokens[2] === "circle":
            //circle
            checkForCircle(line, row);
            break;
        case tokens[2] === "arc":
            //arc
            checkForArc(line, row);
            break;
        case tokens[2] === "polygon":
            //polygon
            checkForPolygon(line, row);
            break;
        case tokens[2] === "vector":
            //vector
            checkForVector(line, row);
            break;
    }
}

function checkForConstant(line, row) {
    let tokens = line.split(" ");

    if (tokens.length < 2) {
        errors.push({
            row: row,
            char: "0",
            message: "Invalid constant declaration",
        });
        return false;
    }

    if (tokens[1] !== "=") {
    }
    //todo same with variable
}
function checkForLine(line, row) {
    let tokens = line.split(" ");

    //tokens[0] is line
    if (tokens.length !== 4) {
        errors.push({
            row: row,
            char: indexOf(tokens[0]),
            message: "Invalid line declaration",
        });
        return false;
    }

    if (isPosition(tokens[1] === false)) {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Invalid position",
        });
        return false;
    }

    if (isPosition(tokens[2]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[2]),
            message: "Invalid position",
        });
        return false;
    }

    if (tokens[3] !== ";") {
        errors.push({
            row: row,
            char: indexOf(tokens[2]),
            message: "Missing ;",
        });
        return false;
    }
}
function checkForPoint(line, row) {
    let tokens = line.split(" ");

    //tokens[0] is point

    if (tokens.length !== 3) {
        errors.push({
            row: row,
            char: indexOf(tokens[0]),
            message: "Invalid point declaration",
        });
        return false;
    }

    if (isPosition(tokens[1]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Invalid position",
        });
        return false;
    }

    if (tokens[2] !== ";") {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Missing ;",
        });
        return false;
    }
}
function checkForRect(line, row) {
    let tokens = line.split(" ");

    //tokens[0] is rect

    if (tokens.length !== 6) {
        errors.push({
            row: row,
            char: indexOf(tokens[0]),
            message: "Invalid rect declaration",
        });
        return false;
    }

    if (isPosition(tokens[1]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Invalid position",
        });
        return false;
    }

    if (isNumeric(tokens[2]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[2]),
            message: "Invalid number",
        });
        return false;
    }

    if (isNumeric(tokens[3]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[3]),
            message: "Invalid number",
        });
        return false;
    }

    if (tokens[4] !== ";") {
        errors.push({
            row: row,
            char: indexOf(tokens[3]),
            message: "Missing ;",
        });
        return false;
    }
}
function checkForCircle(line, row) {
    let tokens = line.split(" ");

    //tokens[0] is circle

    if (tokens.length !== 5) {
        errors.push({
            row: row,
            char: indexOf(tokens[0]),
            message: "Invalid circle declaration",
        });
        return false;
    }

    if (isPosition(tokens[1]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Invalid position",
        });
        return false;
    }

    if (isNumeric(tokens[2]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[2]),
            message: "Invalid number",
        });
        return false;
    }

    if (tokens[3] !== ";") {
        errors.push({
            row: row,
            char: indexOf(tokens[2]),
            message: "Missing ;",
        });
        return false;
    }
}
function checkForArc(line, row) {
    let tokens = line.split(" ");

    //tokens[0] is arc

    if (tokens.length !== 7) {
        errors.push({
            row: row,
            char: indexOf(tokens[0]),
            message: "Invalid arc declaration",
        });
        return false;
    }

    if (isPosition(tokens[1]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Invalid position",
        });
        return false;
    }

    if (isNumeric(tokens[2]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[2]),
            message: "Invalid number",
        });
        return false;
    }

    if (isAngle(tokens[3]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[3]),
            message: "Invalid angle",
        });
        return false;
    }

    if (isAngle(tokens[4]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[4]),
            message: "Invalid angle",
        });
        return false;
    }

    if (tokens[5] !== ";") {
        errors.push({
            row: row,
            char: indexOf(tokens[3]),
            message: "Missing ;",
        });
        return false;
    }
}
function checkForPolygon(line, row) {
    let tokens = line.split(" ");

    //tokens[0] is polygone
    //there a to type of polygones

    if (tokens.length === 5) {
        //first case
        // position numeric numeric angle ;
        if (isPosition(tokens[1]) === false) {
            errors.push({
                row: row,
                char: indexOf(tokens[1]),
                message: "Invalid position",
            });
            return false;
        }

        if (isNumeric(tokens[2]) === false) {
            errors.push({
                row: row,
                char: indexOf(tokens[2]),
                message: "Invalid number",
            });
            return false;
        }

        if (isNumeric(tokens[3]) === false) {
            errors.push({
                row: row,
                char: indexOf(tokens[3]),
                message: "Invalid number",
            });
            return false;
        }

        if (isAngle(tokens[4]) === false) {
            errors.push({
                row: row,
                char: indexOf(tokens[4]),
                message: "Invalid angle",
            });
            return false;
        }

        if (tokens[5] !== ";") {
            errors.push({
                row: row,
                char: indexOf(tokens[4]),
                message: "Missing ;",
            });
            return false;
        }
    } else if (tokens.length > 5) {
        //second case
        // position position position position ... ;
        for (let i = 1; i < tokens.length; i++) {
            if (isPosition(tokens[i]) === false) {
                errors.push({
                    row: row,
                    char: indexOf(tokens[i]),
                    message: "Invalid position",
                });
                return false;
            }
        }
    } else {
        errors.push({
            row: row,
            char: indexOf(tokens[0]),
            message: "Invalid polygone declaration",
        });
        return false;
    }
}
function checkForVector(line, row) {
    let tokens = line.split(" ");

    //tokens[0] is vector

    if (tokens.length !== 4) {
        errors.push({
            row: row,
            char: indexOf(tokens[0]),
            message: "Invalid vector declaration",
        });
        return false;
    }

    if (isPosition(tokens[1]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[1]),
            message: "Invalid position",
        });
        return false;
    }

    if (isPosition(tokens[2]) === false) {
        errors.push({
            row: row,
            char: indexOf(tokens[2]),
            message: "Invalid position",
        });
        return false;
    }

    if (tokens[3] !== ";") {
        errors.push({
            row: row,
            char: indexOf(tokens[3]),
            message: "Missing ;",
        });
        return false;
    }
}
//data
const PossibleLines = {
    RECT: ["rectangle", "position", "numeric", "numeric", ";"],
    ARC: ["arc", "position", "numeric", "skalar", "skalar", ";"],
    CIRCLE: ["circle", "position", "numeric", ";"],
    POLYGONE: ["polygone", "position", "numeric", "numeric", "angle", ";"],
    VECTOR: ["vector", "position", "position", ";"],
    LINE: ["position", "position", ";"],
    POINT: ["position", ";"],
};

function isPosition(token) {
    let result = false;

    if (token[0] === "(" && token[token.length - 1] === ")") {
        token = token.substring(1, token.length - 1);
        let sizes = token.split(",");

        if (sizes.length === 2) {
            if (isNumeric(sizes[0]) && isNumeric(sizes[1])) {
                result = true;
            }
        }
    }

    return result;
}
function isAngle(token) {
    let result = false;

    let deg = token[token.length - 1];
    let value = getStringTillChar(token, "°");

    if (deg === "°") {
        if (isNumeric(value)) {
            result = true;
        }
    }
    return result;
}
function isName(token) {
    return isUppercaseOrUnderscore(token);
}
function isFillColor(token) {
    // f:c(any color type)
    let value = getStringTillChar(token, "(");

    if (value == "f:c") {
        let format = isValidColor(token);
        if (format != "Invalid") {
            return true;
        } else {
            return false;
        }
    }
}
function isNumeric(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}
