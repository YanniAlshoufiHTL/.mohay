function getTokenType(token) {
    let result = "error";

    switch (true) {
        case token.startsWith("."):
            result = "variable";
            break;
        case token === "=":
            result = "expression";
            break;
        case isNumeric(token):
            result = "numeric";
            break;
        case token === "rect":
            result = "rectangle";
            break;
        case token === "wow":
            result = "constant";
            break;
        case token === "circle":
            result = "circle";
            break;
        case token === "line":
            result = "line";
            break;
        case token === "arc":
            break;
        case token === "triangle":
            result = "triangle";
            break;
        case token === "polygone":
            result = "polygone";
            break;
        case isPosition(token):
            result = "position";
            break;
        case isName(token):
            result = "name";
            break;
        case isAngle(token):
            result = "angle";
            break;
        case token === "vector":
            result = "vector";
            break;
        case "line":
            result = "line";
            break;
        default:
            result = "error";
            break;
    }

    return result;
}
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
