using System;
using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    public class Line : IShape {
        public Line(string value, ShapeAttribute attribute) {
            //value = new Point(..,..), new Point(..,..)
            string[] values = StringHelper.GetLineValues(value);
            //values = [..,..], [..,..]

            Keyword!.Name.Value = "line";
            Position1 = new Position(values[0], attribute);
            Position2 = new Position(values[1], attribute);
            Attributes = new ShapeAttribute(attribute);
        }
        public ShapeAttribute Attributes { get; set; }
        public IKeyword Keyword { get; set; }
        public IPosition Position1 { get; set; }
        public IPosition Position2 { get; set; }

        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"line({Position1.X},{Position1.Y},{Position2.X},{Position2.Y});");
        }
    }
}