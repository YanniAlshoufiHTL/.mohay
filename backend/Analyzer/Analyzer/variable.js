function checkSyntaxVariable(line) {
    //not checking for "." because this method only gets called after "."
    if (!line.includes("=")) {
        return "not valid Syntax for variable"; //not valid Syntax 
    }
}
class variable {
    constructor(name, value) {
        this.name = name;
        switch(value){
            case value.includes("rect"):
                this.value = new rect(getStringBetween(value, "rect", "\n"));
                break;
        }
    }
}