function checkline(line) {
    const tokenTypes = line.map((item) => item.tokenType);
    let result = "error";

    let posiblelines = [];
    posiblelines = addPossibleLines();

    if (isSubArrayInMainArray(posiblelines, tokenTypes)) {
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
    POLYGONE1: ["variable", "expression", "polygone", "position"],
    POLYGONE2: [
        "variable",
        "expression",
        "polygone",
        "position",
        "numeric",
        "numeric",
        "angle",
    ],
};

function addPossibleLines() {
    let result = [];

    result.push(Object.values(PossibleLines.RECT));
    result.push(Object.values(PossibleLines.ARC));
    result.push(Object.values(PossibleLines.CIRCLE));
    result.push(Object.values(PossibleLines.VAR));
    result.push(Object.values(PossibleLines.DECLARE));
    result.push(Object.values(PossibleLines.TRIANGLE));
    result.push(Object.values(PossibleLines.POLYGONE1));

    return result;
}
function isSubArrayInMainArray(mainArray, subArray) {
    if (typeof subArray === "string") {
        for (let i = 0; i < mainArray.length; i++) {
            const currentArray = mainArray[i];
            if (currentArray.some((item) => item.token === subArray)) {
                return true;
            }
        }
        return false;
    }
    for (let i = 0; i < mainArray.length; i++) {
        const currentArray = mainArray[i];
        if (currentArray.length < subArray.length) {
            continue;
        }
        let isEqual = true;
        for (let j = 0; j < subArray.length; j++) {
            if (
                subArray[j].tokenType === "position" &&
                currentArray[j].tokenType === "position"
            ) {
                continue;
            }
            if (
                currentArray[j].tokenType !== subArray[j].tokenType ||
                currentArray[j].token !== subArray[j].token
            ) {
                isEqual = false;
                break;
            }
        }
        if (isEqual) {
            return true;
        }
    }
    return false;
}
