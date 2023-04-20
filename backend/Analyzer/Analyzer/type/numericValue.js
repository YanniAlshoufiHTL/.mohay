class numeric {
    constructor(value) {
        this.value = value;
    }
    static checkSyntaxSize(size) {
        size = size.toString().trim().split(" ");

        if (size[0] == null && size[1] == null) {
            return "size is not valid";
        }

        if (!isNumeric(size[0]) && !isNumeric(sizeY[1])) {
            return "is not a number";
        }
    }
    static checkSyntaxNumeric(value) {
        if (!isNumeric(value)) {
            return "is not a number";
        }
    }
}
