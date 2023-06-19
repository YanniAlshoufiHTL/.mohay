using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;
using transpiler.Logic.Composite_values;

namespace transpiler.Logic.Composite_classes {
    public class Arc : IShape {
        public Arc(string value, ShapeAttribute attribute) {
            //value = arc (1, 1) 10 20 30 
            string[] values = StringHelper.GetArcValues(value);
            //values = [(..,..)], [..], [..], [..]

            Keyword = new Keyword("arc");
            Position = new Point(values[0], attribute);
            Size = new Value(values[1]);
            Angle1 = new Value(values[2]);
            Angle2 = new Value(values[3]);
            Attributes = new ShapeAttribute(attribute);
        }
        public IPosition Position { get; set; }
        public IValue Size { get; set; }
        public IValue Angle1 { get; set; }
        public IValue Angle2 { get; set; }
        public ShapeAttribute Attributes { get; set; }
        public IKeyword Keyword { get; set; }

        public void ToJSCode(StringBuilder builder) {
            Attributes.ToJSCode(builder);

            builder.AppendLine($"arc({Position.X},{Position.Y},{Size},{Size},{Angle1},{Angle2});");
        }
    }
}