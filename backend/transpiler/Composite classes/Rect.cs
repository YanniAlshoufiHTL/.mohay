using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;
using transpiler.Logic.Composite_values;

namespace transpiler.Logic.Composite_classes {
    public class Rect : IShape {
        public Rect(string value, ShapeAttribute attribute) {
            //value = rect (1, 1) 10 30
            string[] values = StringHelper.GetRectValues(value);
            //values = [(..,..)], [..], [..]

            Keyword = new Keyword("rect");
            Position = new Point(values[0], attribute);
            Size1 = new Value(values[1]);
            Size2 = new Value(values[2]);
            Attributes = new ShapeAttribute(attribute);
        }
        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"sketch.rect({Position!.X},{Position.Y},{Size1},{Size2});");
        }
        public IKeyword Keyword { get; set; }
        public IPosition? Position { get; set; }
        public IValue? Size1 { get; set; }
        public IValue? Size2 { get; set; }
        public ShapeAttribute Attributes { get; set; }
    }
}