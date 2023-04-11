class Analyzer{
    constructor(){
        this = new Analyzer();
    }
    analyze(code){
        let lines = code.split("\n");
        let variables = [];
        let constants = [];

        for(let line of lines){
            line = line.trim();
            switch(line){
                case line[0] === ".":
                    //variable
                    let data = line.substr(3, line.length);
                    if(!data.includes("=")){
                        //error 2
                    }else{
                        let name = line.Split("=")[0];
                        if(variables.includes(name)){
                            //declarion of existing variable
                        }else{
                            
                        }
                    }
                    break;
                case line.substr(1,3) === "wow": 
                //constant
                    break;
        }


    }
}
    reqeust(line, char){
        return "yeet";
    }
}