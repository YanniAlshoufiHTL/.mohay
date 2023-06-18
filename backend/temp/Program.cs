namespace temp;

using System.Text;
using transpiler.Logic;
using transpiler.Logic.Composite_classes;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

class Temp {
    private static ShapeAttribute globalAttribute = new();
    private static List<IExpression> expressions = new();
    static void Main(string[] args) {
        string input = "wow EEE = 10\r\nrect (EEE,EEE) EEE EEE\r\nx1 = line (1,1) (1,1)\r\nline (1,1) (1,1)\r\npoint (1,1)\r\nrect (1,1) 10 10\r\ncircle (1,1) 10\r\narc (1,1) 10 20 30\r\nc #123456\r\nf 1\r\nf 0\r\ns 1\r\ns 0\r\nline (1,1) (1,1)\r\n";


        input = input.Replace("\r", String.Empty);
        string[] values = input.Split('\n');

        foreach (string value in values) {
            string firstvalue = value.Split(" ")[0];

            switch (firstvalue) {
                case "wow":
                    //wow EEE = 10;
                    expressions.Add(new Constant(value));
                    break;
                case "line":
                    //line (1, 1) (1, 1)
                    expressions.Add(new Line(value, globalAttribute));
                    break;
                case "point":
                    //point (1, 1)
                    expressions.Add(new Point(value, globalAttribute));
                    break;
                case "rect":
                    //rect (1, 1) 10 10
                    expressions.Add(new Rect(value, globalAttribute));
                    break;
                case "circle":
                    //circle (1, 1) 10
                    expressions.Add(new Circle(value, globalAttribute));
                    break;
                case "arc":
                    //arc (1, 1) 10 20 30y
                    expressions.Add(new Arc(value, globalAttribute));
                    break;
                case "f":
                    //f true or f false
                    globalAttribute.IsFillSet = value.Split(" ")[1] == "true" ?
                        true : false;
                    break;
                case "s":
                    //s true or s false
                    globalAttribute.IsStrokeSet = value.Split(" ")[1] == "true" ?
                        true : false;
                    break;
                case "c":
                    string color = value.Split(" ")[1];
                    globalAttribute.Stroke = color;
                    globalAttribute.Fill = color;
                    break;
                default:
                    expressions.Add(new Variable(value));
                    break;
            }
        }

        StringBuilder builder = new();

        builder.AppendLine("function setup() {");
        builder.AppendLine("createCanvas(400, 400);");
        builder.AppendLine("}");

        builder.AppendLine("function draw() {");

        foreach (var expression in expressions) {
            var toJsMethod = expression.GetType().GetMethod("ToJSCode");

            toJsMethod?.Invoke(expression, new object[] { builder });
        }

        builder.AppendLine("}");
    }
}