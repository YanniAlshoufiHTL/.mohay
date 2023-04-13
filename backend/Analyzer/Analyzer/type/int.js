class int {
    constructor(value) {
        this.value = value;
    }
    checkSyntaxSize(size) {
        //required x + y
        if (size.length != 2) {
            return "size is not valid";
        }
        if (!isNumeric(size[0]) && !isNumeric(size[1])) {
            return "is not a number";
        }
    }
}
