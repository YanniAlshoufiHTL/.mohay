class constant{
    constructor(name, value, line){
        this.name = name;
        this.value = value;
        this.type = "constant";
        this.line = line;
    }
    constructor(name, line){
        this.name = name;
        this.value = null;
        this.type = "constant";
        this.line = line;
    }
}