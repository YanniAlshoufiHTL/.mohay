namespace temp;
using transpiler.Logic;
using transpiler.Logic.Composite_classes;
using transpiler.Logic.Composite_interfaces;

class Temp {
    private Attribute globalAttribute = );
    private List<IExpression> expressions = new();
    static void Main(string[] args) {
        string input = "wow EEE = 10\r\nrect (EEE,EEE) EEE EEE\r\nx1 = line (1,1) (1,1)\r\nline (1,1) (1,1)\r\npoint (1,1)\r\nrect (1,1) 10 10\r\ncircle (1,1) 10\r\narc (1,1) 10 20 30\r\nc #123456\r\nf 1\r\nf 0\r\ns 1\r\ns 0\r\nline (1,1) (1,1)\r\n";


        input = input.Replace("\r", String.Empty);
        string[] values = input.Split('\n');

        foreach (string value in values) {
            string firstvalue = value.Split(" ")[0];

            switch (firstvalue) {
                case "wow": 

                    break;
                case "line":
                    break;
                case "point":
                    break;
                case "rect":
                    break;
                case "circle":
                    break;
                case "arc":
                    break;
                case "f":
                    break;
                case "s":
                    break;
            }
        }
    }
}