using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using transpiler.Logic.Composite_interfaces;
using transpiler.Logic.Composite_interfaces.Expression;

namespace transpiler.Logic.Composite_classes {
    internal class Rect : IShape {
        public Rect(string value, ShapeAttribute attribute) {
            //value = new Point(..,..), 30, 1 
            string[] values = StringHelper.GetRectValues(value);
            //values = [..,..], [..], [..]
            Keyword!.Name.Value = "rect";

            RectPosition = new Position(values[0]);
            Size1!.Value = Convert.ToDouble(values[1]);
            Size2!.Value = Convert.ToDouble(values[2]);
            Attribute = new ShapeAttribute(attribute);
        }
        public IKeyword? Keyword { get; set; }
        public IPosition? RectPosition { get; set; }
        public INumeric? Size1 { get; set; }
        public INumeric? Size2 { get; set; }
        public ShapeAttribute Attribute { get; set; }
    }
}