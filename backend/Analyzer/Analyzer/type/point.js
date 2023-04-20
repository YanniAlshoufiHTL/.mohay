class point {
    constructor(x, y) {
        this.x = new numeric(x);
        this.y = new numeric(y);
    }
    static checkSyntaxPoint(pointvalue) {
        //required x + y
        if (!pointvalue.includes(",")) {
            return "point is not valid";
        }
        let point = pointvalue.split(",");
        if (!isNumeric(point[0]) && !isNumeric(point[1])) {
            return "is not a number";
        }
    }
}
