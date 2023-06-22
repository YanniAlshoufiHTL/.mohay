using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;
using transpiler.Logic.Composite_values;

namespace transpiler.Logic.Composite_classes {
    public class Circle : IShape {
        public Circle(string value, ShapeAttribute attribute) {
            //value = circle (1, 1) 10
            string[] values = StringHelper.GetCircleVaues(value);
            //values = [(..,..)], [..]

            Keyword = new Keyword("circle");
            CirclePosition = new Point(values[0], attribute);
            Size = new Value(values[1]);
            Attributes = new ShapeAttribute(attribute);
        }
        public IKeyword Keyword { get; set; }
        public IPosition? CirclePosition { get; set; }
        public IValue? Size { get; set; }
        public ShapeAttribute Attributes { get; set; }

        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"sketch.circle({CirclePosition!.X},{CirclePosition!.Y},{Size});");
        }
    }
}