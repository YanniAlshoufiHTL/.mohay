function checkline(line) {
    const tokenTypes = line.map((item) => item.tokenType);
    let result = "error";

    let posiblelines = [];
    posiblelines = addPosibleLines();

    if (isSubArrayInMainArray(posiblelines, tokenTypes)) {
        result = "correct";
    }

    return result;
}
function addPosibleLines() {
    let result = [];

    result.push([
        "variable",
        "expression",
        "rectangle",
        "position",
        "numeric",
        "numeric",
    ]);

    result.push([
        "variable",
        "expression",
        "circle",
        "position",
        "numeric",
        "numeric",
    ]);

    result.push(["variable"]);

    result.push(["variable", "expression", "variable"]);

    return result;
}
function isSubArrayInMainArray(mainArray, subArray) {
    return mainArray.some(
        (array) =>
            array.length === subArray.length &&
            array.every((item, index) => item === subArray[index])
    );
}
