class circle {
    constructor(value) {
        // required (pointX, pointY) + x + y
        let point = getStringBetween(value, "(", ")");
        value = value.replace(`(${point})`, "");

        let error = checkSyntaxPoint(point);
        if (error != null) {
            errors.push(
                error + "\n" + "at line ${line}" + "in file ${globalfilename}"
            );
        } else {
            this.point = new point(point);
        }

        error = numeric.checkSyntaxNumeric(getStringBetween(value, ")", "\n"));
        if (error != null) {
            errors.push(
                error + "\n" + "at line ${line}" + "in file ${globalfilename}"
            );
        } else {
            this.radius = new numeric(getStringBetween(value, ")", "\n"));
        }
    }
}
