using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    public class Position : IShape, IPosition {
        public Position(string value, ShapeAttribute attribute) {
            //value = 3,3
            string[] values = value.Split(",");

            X!.Value = values[0];
            Y!.Value = values[1];
            Attribute = new ShapeAttribute(attribute);
        }
        public IValue? X { get; set; }
        public IValue? Y { get ; set; }
        public ShapeAttribute Attribute { get; set; }

        public void ToJSCode(StringBuilder builder) {
            Attribute.ToJSCode(builder);

            builder.AppendLine($"point({X},{Y});");
        }
    }
}