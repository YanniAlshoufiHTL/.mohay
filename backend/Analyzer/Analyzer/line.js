function checkline(line) {
    const tokenTypes = line.map((item) => item.tokenType);
    let result = "error";

    let posiblelines = [];
    posiblelines = addPossibleLines();

    if (isSubarray(posiblelines, tokenTypes)) {
        result = "correct";
    }

    return result;
}
const PossibleLines = {
    RECT: [
        "variable",
        "expression",
        "rectangle",
        "position",
        "numeric",
        "numeric",
    ],
    CONSTANT: ["constant", "name", "expression", "numeric"],
    ARC: [
        "variable",
        "expression",
        "arc",
        "position",
        "numeric",
        "skalar",
        "skalar",
    ],
    CIRCLE: ["variable", "expression", "circle", "position", "numeric"],
    VAR: ["variable"],
    DECLARE: ["variable", "expression", "variable"],
    TRIANGLE: [
        "variable",
        "expression",
        "triangle",
        "position",
        "position",
        "position",
    ],
    POLYGONE: [
        "variable",
        "expression",
        "polygone",
        "position",
        "numeric",
        "numeric",
        "angle",
    ],
    VECTOR: ["vector", "position", "position"],
    LINE: ["variable", "expression", "line", "position", "position"],
    POINT: ["variable", "expression", "position"],
};

function addPossibleLines() {
    const result = [];

    Object.keys(PossibleLines).forEach((key) => {
        result.push(Object.values(PossibleLines[key]));
    });

    return result;
}

function isSubarray(mainArray, subArray) {
    let result = false;

    for (let i = 0; i < mainArray.length; i++) {
        if (
            Array.isArray(mainArray[i]) &&
            mainArray[i].length === subArray.length
        ) {
            let isMatch = true;
            for (let j = 0; j < mainArray[i].length; j++) {
                if (mainArray[i][j] !== subArray[j]) {
                    isMatch = false;
                    break;
                }
            }
            if (isMatch) {
                result = true;
            }
        }
    }
    //check for exception

    if (result === false) {
        result = checkException(subArray);
    }

    return result;
}
function checkException(subArray) {
    let result = false;

    if (
        subArray.length >= 5 &&
        subArray.includes("error") === false &&
        subArray[0] === "variable" &&
        subArray[1] === "expression" &&
        subArray[2] === "polygone" &&
        subArray[3] === "position" &&
        subArray[4] === "position"
    ) {
        result = true;
    }

    return result;
}
