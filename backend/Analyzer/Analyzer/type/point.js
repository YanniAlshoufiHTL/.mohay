class point {
    constructor(x, y) {
        this.x = new int(x);
        this.y = new int(y);
    }
}

function checkSyntaxPoint(pointvalue) {
    //required x + y
    if (!pointvalue.includes(",")) {
        return "point is not valid";
    }
    let point = split(pointvalue, ",");
    if (!isNumeric(point[0]) && !isNumeric(point[1])) {
        return "is not a number";
    }
}
