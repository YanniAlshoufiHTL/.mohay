using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    public class Position : IShape, IPosition {
        public Position(string value, ShapeAttribute attribute) {
            //value = 3,3
            string[] values = value.Split(",");

            Keyword!.Name.Value = "position";
            X!.Value = values[0];
            Y!.Value = values[1];
            Attributes = new ShapeAttribute(attribute);
        }
        public IKeyword Keyword { get; set; }
        public IValue X { get; set; }
        public IValue Y { get ; set; }
        public ShapeAttribute Attributes { get; set; }

        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"point({X},{Y});");
        }
    }
}