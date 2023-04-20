class rect {
    constructor(value) {
        value = value.trim();

        let pointValue = getStringBetween(value, "(", ")");
        let sizeValue = getRestOfString(value, ")");
        let error = point.checkSyntaxPoint(pointValue);

        if (error != null) {
            errors.push(
                error + "\n" + "at line ${line}" + "in file ${globalfilename}"
            );
        } else {
            pointValue = pointValue.split(",");

            this.point = new point(
                new numeric(pointValue[0]),
                new numeric(pointValue[1])
            );
        }

        error = numeric.checkSyntaxSize(sizeValue);
        if (error != null) {
            errors.push(
                error +
                    "\n" +
                    "at at line ${line}" +
                    "in file ${globalfilename}"
            );
        } else {
            sizeValue = sizeValue.toString().trim().split(" ");

            this.sizeX = new numeric(sizeValue[0]);
            this.sizeY = new numeric(sizeValue[1]);
        }
    }
}
