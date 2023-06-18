using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    public class Circle : IShape {
        public Circle(string value, ShapeAttribute attribute) {
            //value = circle (1, 1) 10
            string[] values = StringHelper.GetCircleVaues(value);
            //values = [(..,..)], [..]

            Keyword!.Name.Value = "circle";
            CirclePosition = new Point(values[0], attribute);
            Size!.Value = values[1];
            Attributes = new ShapeAttribute(attribute);
        }
        public IKeyword Keyword { get; set; }
        public IPosition? CirclePosition { get; set; }
        public IValue? Size { get; set; }
        public ShapeAttribute Attributes { get; set; }

        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"circle({CirclePosition!.X},{CirclePosition!.Y},{Size});");
        }
    }
}