class rect {
    constructor(value) {
        // required (pointX, pointY) + x + y
        let point = getStringBetween(value, "(", ")");
        value = value.replace(`(${point})`, "");
        let size = split(value.trim(), ",");

        let error = checkSyntaxPoint(point);
        if (error != null) {
            errors.push(
                error + "\n" + "at line ${line}" + "in file ${globalfilename}"
            );
        } else {
            this.point = new point(point);
        }

        error = checkSyntaxSize(size);
        if (error != null) {
            errors.push(
                error + "\n" + "at line ${line}" + "in file ${globalfilename}"
            );
        }
        else{

        }
    }
}
