using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;
using transpiler.Logic.Composite_values;

namespace transpiler.Logic.Composite_classes {
    public class Point : IShape, IPosition {
        public Point(string value, ShapeAttribute attribute) {
            //value = point (1, 1)
            string[] values = StringHelper.GetPointValues(value);
            //[..], [..]

            Keyword = new Keyword("point");
            X = new Value(values[0]);
            Y = new Value(values[1]);
            Attributes = new ShapeAttribute(attribute);
        }
        public IKeyword Keyword { get; set; }
        public IValue X { get; set; }
        public IValue Y { get; set; }
        public ShapeAttribute Attributes { get; set; }

        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"point({X},{Y});");
        }
    }
}