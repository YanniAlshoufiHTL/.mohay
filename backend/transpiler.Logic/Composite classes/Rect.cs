using System.Text;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    public class Rect : IShape {
        public Rect(string value, ShapeAttribute attribute) {
            //value = new Point(..,..), 30, 1 
            string[] values = StringHelper.GetRectValues(value);
            //values = [..,..], [..], [..]

            Keyword!.Name.Value = "rect";
            Position = new Position(values[0], attribute);
            Size1!.Value = values[1];
            Size2!.Value = values[2];
            Attributes = new ShapeAttribute(attribute);
        }
        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"rect({Position!.X},{Position.Y},{Size1},{Size2});");
        }
        public IKeyword Keyword { get; set; }
        public IPosition? Position { get; set; }
        public IValue? Size1 { get; set; }
        public IValue? Size2 { get; set; }
        public ShapeAttribute Attributes { get; set; }
    }
}